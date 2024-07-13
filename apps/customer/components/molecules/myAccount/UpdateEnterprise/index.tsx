/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 25 April 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import type { PropsStepper } from '@mtcloud/globals/types';
import { EnterpriseUpdateUserData } from '@mtcloud/utils/validation/types';
import validatorFunctions, { validateEmail } from '@mtcloud/utils/validation/UpdateProfile/Enterprise';
import { Form, Formik } from 'formik';
import Typography from '@mtcloud/ui/atoms/Typography';
import Label from '@mtcloud/ui/atoms/Label';
import TextField from '@mtcloud/ui/atoms/TextInput';
import Button from '@mtcloud/ui/atoms/Button';
import ErrorMgs from '@mtcloud/ui/atoms/ErrorMessage';
import FileUploadField from '@mtcloud/ui/atoms/FileUploadField';
import SelectField from '@mtcloud/ui/atoms/Selector';
import CountrySelect from '@mtcloud/ui/atoms/CountrySelect';
import CountryCodeSelect from '@mtcloud/ui/atoms/CountryCodeSelect';
import { useEffect, useRef, useState } from 'react';
import { MinusIcon, PlusIcon } from '@mtcloud/ui/atoms/icons';
import InputInfo from '@mtcloud/ui/atoms/InputInfo';
import useCountry from 'components/hooks/useCountry';
import toast from 'react-hot-toast';
import api from 'api';
import { isLoggedIn } from 'utils/auth';
import { parsePhoneNumber } from 'libphonenumber-js';
import { Oval } from 'react-loader-spinner';
import { NETWORK_STATUS_CODES } from '@/constants';

const companyDetailsFields = [
  {
    label: 'Company Name *',
    name: 'companyName',
    component: '',
    options: '',
  },
  {
    label: 'Business Registration Number *',
    name: 'businessRegNumber',
    component: '',
    options: '',
  },
  {
    label: 'Company Address *',
    name: 'companyAddress',
    component: '',
    options: '',
  },
  {
    label: 'Country *',
    name: 'countryUp',
    component: '',
    options: '',
  },
];

const adminContactFields = [
  {
    label: 'First Name *',
    name: 'firstName',
    component: '',
    info: '',
  },
  {
    label: 'Last Name *',
    name: 'lastName',
    component: '',
    info: '',
  },
  {
    label: 'ID Number/ Passport *',
    name: 'idPassport',
    component: '',
    info: '',
  },
  {
    label: 'Designation in Company *',
    name: 'designation',
    info: '',
    component: SelectField,
    optionalParameters: {
      options: [
        { value: '1', label: 'System Administrator or O&M Engineer' },
        { value: '2', label: 'System Architect' },
        { value: '3', label: 'Software Engineer' },
        { value: '4', label: 'Deputy Technical Director or IT Director' },
        { value: '5', label: 'Technical Director or IT Director' },
        { value: '6', label: 'CTO' },
        { value: '7', label: 'CEO' },
      ],
    },
  },
  {
    label: 'Email * ',
    name: 'email',
    component: '',
    info: 'for future communication and billing purposes',
  },
  {
    label: 'Mobile Number *',
    name: 'mobileNumber',
    component: '',
    info: 'for verification purposes',
  },
];

const additionalContactFields = [
  {
    label: 'First Name',
    name: 'additionalFirstName',
    component: '',
  },
  {
    label: 'Last Name',
    name: 'additionalLastName',
    component: '',
  },
  {
    label: 'ID Number/ Passport ',
    name: 'additionalIdPassport',
    component: '',
  },
  {
    label: 'Designation in Company ',
    name: 'additionalDesignation',
    component: SelectField,
    optionalParameters: {
      options: [
        { value: '1', label: 'System Administrator or O&M Engineer' },
        { value: '2', label: 'System Architect' },
        { value: '3', label: 'Software Engineer' },
        { value: '4', label: 'Deputy Technical Director or IT Director' },
        { value: '5', label: 'Technical Director or IT Director' },
        { value: '6', label: 'CTO' },
        { value: '7', label: 'CEO' },
      ],
    },
  },
  {
    label: 'Email',
    name: 'additionalEmail',
    component: '',
  },
  {
    label: 'Mobile Number ',
    name: 'additionalMobileNumber',
    component: '',
  },
];

const UpdateEnterprise = ({ step, updateStep }: PropsStepper) => {
  const [showAdditionalField, setShowAdditionalField] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());
  const [loading, setStatus] = useState(false);
  const countries = useCountry();

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  let authObj;

  if (typeof window !== 'undefined') {
    if (isAuthenticated) {
      authObj = localStorage.getItem('logged-user');
      authObj = JSON.parse(authObj);
    }
  }

  const phoneNumber = parsePhoneNumber(authObj['mobileNo']);
  let additionalPhoneNumber;
  let additionalCountryCode;
  if (authObj['additionalMobileNo'] !== '') {
    const number = parsePhoneNumber(authObj['additionalMobileNo']);
    additionalPhoneNumber = number.nationalNumber;
    additionalCountryCode = '+' + number.countryCallingCode;
  } else {
    additionalCountryCode = '+230';
    additionalPhoneNumber = '';
  }

  authObj['identifierDoc'][1] = 'data:application/' + authObj['identifierDoc'][0] + ';base64,' + authObj['identifierDoc'][1];
  authObj['proofOfAddressDoc'][1] = 'data:application/' + authObj['proofOfAddressDoc'][0] + ';base64,' + authObj['proofOfAddressDoc'][1];
  authObj['brnDocument'][1] = 'data:application/' + authObj['brnDocument'][0] + ';base64,' + authObj['brnDocument'][1];
  if (authObj['vatCertificate'][0] !== undefined) {
    authObj['vatCertificate'][1] = 'data:application/' + authObj['vatCertificate'][0] + ';base64,' + authObj['vatCertificate'][1];
  } else {
    authObj['vatCertificate'] = '';
  }
  if (authObj['inCorpCertificate'][0] !== undefined) {
    authObj['inCorpCertificate'][1] = 'data:application/' + authObj['inCorpCertificate'][0] + ';base64,' + authObj['inCorpCertificate'][1];
  } else {
    authObj['inCorpCertificate'] = '';
  }

  const oldEmail = useRef(authObj['email']);
  const isOldEmailValid = useRef(true);

  const countryOptions = countries.map(({ countryName, countryCode, flag }) => ({
    value: countryName,
    label: countryName,
    flag: flag,
    code: countryCode,
  }));

  const countryCodeOptions = countries.map(({ countryCode, flag }) => ({
    value: countryCode,
    label: countryCode,
    flag: flag,
  }));

  const saveUserData = async (data: EnterpriseUpdateUserData) => {
    let additionalNumber;
    if (data.additionalMobileNumber === '') {
      additionalNumber = data.additionalMobileNumber;
    } else {
      additionalNumber = data.additionalMobileNumberCountryCode.concat(data.additionalMobileNumber);
    }
    let vatDoc;
    let incDoc;
    if (data.VAT === undefined) {
      vatDoc = null;
    } else {
      vatDoc = data.VAT;
    }
    if (data.incorporation === undefined) {
      incDoc = null;
    } else {
      incDoc = data.incorporation;
    }
    const payload = {
      additionalDesignation: data.additionalDesignation,
      additionalEmail: data.additionalEmail,
      additionalFirstName: data.additionalFirstName,
      additionalIdentifier: data.additionalIdPassport,
      additionalLastName: data.additionalLastName,
      additionalMobileNo: additionalNumber,
      brnDocument: data.businessRegCertificate,
      businessRegistrationNumber: data.businessRegNumber,
      companyAddress: data.companyAddress,
      companyName: data.companyName,
      country: data.countryUp,
      designation: data.designation,
      email: data.email,
      firstName: data.firstName,
      identifier: data.idPassport,
      identifierDoc: data.idPassportFile,
      inCorpCertificate: incDoc,
      lastName: data.lastName,
      mobileNo: data.countryCode.concat(data.mobileNumber),
      proofOfAddressDoc: data.addressProof,
      vatCertificate: vatDoc,
    };
    // if (typeof window !== 'undefined') {
    //   localStorage.setItem('update-user', JSON.stringify(payload));
    // }
    const response = await api.profile.updateEnterpriseUser(payload);

    if (response.data.status === 'SUCCESSFUL') {
      setStatus(false);
      updateStep(step + 1);
    } else {
      if (!NETWORK_STATUS_CODES.includes(response.code)) {
        setStatus(false);
        toast.error('Failed user data update', { duration: 8000 });
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className='grid place-items-center fixed inset-y-0 inset-x-0 overflow-y-auto bg-slate-100/[0.3] z-[1000]'>
          <Oval
            color='#00aeef'
            secondaryColor='#fff'
            width={70}
            strokeWidth={3}
            wrapperStyle={{ filter: 'drop-shadow(3px 3px 6px rgb(0 0 0 / 0.8))' }}
          />
        </div>
      ) : null}
      <Formik
        initialValues={{
          companyName: authObj['companyName'],
          businessRegNumber: authObj['businessRegistrationNumber'],
          companyAddress: authObj['companyAddress'],
          countryUp: authObj['country'],
          firstName: authObj['firstName'],
          lastName: authObj['lastName'],
          idPassport: authObj['identifier'],
          designation: authObj['designation'],
          email: authObj['email'],
          countryCode: '+' + phoneNumber.countryCallingCode,
          mobileNumber: phoneNumber.nationalNumber,
          additionalFirstName: authObj['additionalFirstName'],
          additionalLastName: authObj['additionalLastName'],
          additionalIdPassport: authObj['additionalIdentifier'],
          additionalDesignation: authObj['additionalDesignation'],
          additionalEmail: authObj['additionalEmail'],
          additionalMobileNumberCountryCode: additionalCountryCode,
          additionalMobileNumber: additionalPhoneNumber,
          idPassportFile: authObj['identifierDoc'][1],
          addressProof: authObj['proofOfAddressDoc'][1],
          businessRegCertificate: authObj['brnDocument'][1],
          VAT: authObj['vatCertificate'] !== undefined ? authObj['vatCertificate'][1] : '',
          incorporation: authObj['inCorpCertificate'] !== undefined ? authObj['inCorpCertificate'][1] : '',
        }}
        validate={async (values: EnterpriseUpdateUserData) => {
          let isValidEmail: boolean;
          let emailError = validateEmail(values.email);

          if (emailError === '') {
            isValidEmail = isOldEmailValid.current;
            if (!isValidEmail) {
              emailError = 'This email is already in use.';
            }

            if (values.email !== oldEmail.current) {
              isValidEmail = await api.register.verifyEmailExist(encodeURIComponent(values.email));
              oldEmail.current = values.email;
              isOldEmailValid.current = isValidEmail;
              emailError = 'This email is already in use.';
            }
          }

          const validationResponse = validatorFunctions.reduce((acc: { email?: string }, func) => {
            const errorData = func(values);
            return { ...acc, ...errorData };
          }, {});

          if (!isValidEmail) {
            validationResponse.email = emailError;
          }

          return validationResponse;
        }}
        onSubmit={async (values) => {
          setStatus(true);
          await saveUserData(values);
        }}
      >
        {({ handleSubmit, errors, touched, dirty, isValid, setFieldValue, setFieldTouched }) => (
          <Form className='mx-auto max-w-3xl flex flex-col w-full' onSubmit={handleSubmit}>
            <Typography textColorScheme='charcoal' textTypeScheme='h6'>
              Company Details
            </Typography>
            <div className='flex-none md:flex'>
              <div className='w-full flex flex-wrap'>
                {companyDetailsFields.map(({ name, label, component, options }) => (
                  <div className='w-full md:w-1/2 px-3' key={name}>
                    <Label name={name} errors={errors[name]} touched={touched[name]}>
                      {label}
                    </Label>
                    {name === 'countryUp' ? (
                      <CountrySelect name={name} options={countryOptions} />
                    ) : (
                      <TextField type='text' name={name} errors={errors[name]} touched={touched[name]} component={component} options={options} />
                    )}

                    <ErrorMgs name={name} />
                  </div>
                ))}
              </div>
            </div>

            <Typography textColorScheme='charcoal' textTypeScheme='h6'>
              Administrator Contact Details
            </Typography>
            <div className='flex-none md:flex'>
              <div className='w-full flex flex-wrap'>
                {adminContactFields.map(({ name, label, info, component, optionalParameters = {} }) => (
                  <div className='w-full md:w-1/2 px-3' key={name}>
                    <Label name={name} errors={errors[name]} touched={touched[name]}>
                      {label}
                    </Label>
                    {name === 'mobileNumber' ? (
                      <div className='flex w-full'>
                        <div className='w-2/5 pr-1'>
                          <CountryCodeSelect name='countryCode' type='tel' options={countryCodeOptions} />
                        </div>
                        <div className='w-3/5'>
                          <TextField
                            type='tel'
                            name={name}
                            errors={errors[name]}
                            touched={touched[name]}
                            component={component}
                            {...optionalParameters}
                          />
                        </div>
                      </div>
                    ) : (
                      <TextField
                        type='text'
                        name={name}
                        errors={errors[name]}
                        touched={touched[name]}
                        component={component}
                        {...optionalParameters}
                      />
                    )}
                    {touched[name] && <ErrorMgs name={name} />}
                    {info !== '' && <InputInfo info={info} />}
                  </div>
                ))}
              </div>
            </div>
            <Typography textColorScheme='charcoal' textTypeScheme='h6' className='flex flex-row justify-between pr-5'>
              Additional Contact Details
              <div className='pt-2' onClick={() => setShowAdditionalField(!showAdditionalField)}>
                {showAdditionalField ? <MinusIcon className='w-4 h-4 cursor-pointer' /> : <PlusIcon className='w-4 h-4 cursor-pointer' />}
              </div>
            </Typography>
            {showAdditionalField ? (
              <div className='flex-none md:flex'>
                <div className='w-full flex flex-wrap'>
                  {additionalContactFields.map(({ name, label, component, optionalParameters = {} }) => (
                    <div className='w-full md:w-1/2 px-3' key={name}>
                      <Label name={name} errors={errors[name]} touched={touched[name]}>
                        {label}
                      </Label>
                      {name === 'additionalMobileNumber' ? (
                        <div className='flex w-full'>
                          <div className='w-2/5 pr-1'>
                            <CountryCodeSelect name='additionalMobileNumberCountryCode' type='tel' options={countryCodeOptions} />
                          </div>
                          <div className='w-3/5'>
                            <TextField
                              type='text'
                              name={name}
                              errors={errors[name]}
                              touched={touched[name]}
                              component={component}
                              {...optionalParameters}
                            />
                          </div>
                        </div>
                      ) : (
                        <TextField
                          type='text'
                          name={name}
                          errors={errors[name]}
                          touched={touched[name]}
                          component={component}
                          {...optionalParameters}
                        />
                      )}

                      <ErrorMgs name={name} />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            <Typography textColorScheme='charcoal' textTypeScheme='h6'>
              Upload Your Documents
            </Typography>

            <div className='flex-none md:flex'>
              <div className='w-full md:w-1/2 px-3'>
                <Label name='idPassportFile' errors={errors.idPassportFile} touched={touched.idPassportFile}>
                  ID Card/ Passport *
                </Label>
                <FileUploadField
                  name='idPassportFile'
                  errors={errors.idPassportFile}
                  touched={touched.idPassportFile}
                  file={authObj['identifierDoc'].length !== 0 ? 'idPassportFile.' + authObj['identifierDoc'][0] : ''}
                  onChange={(fileUploaded) => {
                    setFieldValue('idPassportFile', fileUploaded);
                    setFieldTouched('idPassportFile', true);
                  }}
                />
                <ErrorMgs name='idPassportFile' />
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <Label name='businessRegCertificate' errors={errors.businessRegCertificate} touched={touched.businessRegCertificate}>
                  Business Registration Certificate *
                </Label>
                <FileUploadField
                  name='businessRegCertificate'
                  errors={errors.businessRegCertificate}
                  touched={touched.businessRegCertificate}
                  file={authObj['brnDocument'].length !== 0 ? 'businessRegCertificate.' + authObj['brnDocument'][0] : ''}
                  onChange={(fileUploaded) => {
                    setFieldValue('businessRegCertificate', fileUploaded);
                    setFieldTouched('businessRegCertificate', true);
                  }}
                />
                <ErrorMgs name='businessRegCertificate' />
              </div>
            </div>
            <div className='flex-none md:flex'>
              <div className='w-full md:w-1/2 px-3'>
                <Label name='addressProof' errors={errors.addressProof} touched={touched.addressProof}>
                  Proof of Address *
                </Label>
                <FileUploadField
                  name='addressProof'
                  errors={errors.addressProof}
                  touched={touched.addressProof}
                  file={authObj['proofOfAddressDoc'].length !== 0 ? 'addressProof.' + authObj['proofOfAddressDoc'][0] : ''}
                  onChange={(fileUploaded) => {
                    setFieldValue('addressProof', fileUploaded);
                    setFieldTouched('addressProof', true);
                  }}
                />
                <ErrorMgs name='addressProof' />
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <Label name='incorporation' errors={errors.incorporation} touched={touched.incorporation}>
                  Certificate of Incorporation
                </Label>
                <FileUploadField
                  name='incorporation'
                  errors={errors.incorporation}
                  touched={touched.incorporation}
                  file={authObj['inCorpCertificate'].length !== 0 ? 'incorporation.' + authObj['inCorpCertificate'][0] : ''}
                  onChange={(fileUploaded) => {
                    setFieldValue('incorporation', fileUploaded);
                    setFieldTouched('incorporation', true);
                  }}
                />
                <ErrorMgs name='incorporation' />
              </div>
            </div>
            <div className='flex-none md:flex'>
              <div className='w-full md:w-1/2 px-3'>
                <Label name='VAT' errors={errors.VAT} touched={touched.VAT}>
                  VAT Certificate
                </Label>
                <FileUploadField
                  name='VAT'
                  errors={errors.VAT}
                  touched={touched.VAT}
                  file={authObj['vatCertificate'].length !== 0 ? 'VAT.' + authObj['vatCertificate'][0] : ''}
                  onChange={(fileUploaded) => {
                    setFieldValue('VAT', fileUploaded);
                    setFieldTouched('VAT', true);
                  }}
                />
                <ErrorMgs name='VAT' />
              </div>
            </div>
            <div className='flex place-content-center py-2'>
              <Button
                colorScheme='skyBlue'
                textStyleScheme='semiboldMedium'
                textColorScheme='white'
                sizeScheme='md'
                borderScheme='rounded'
                onClick={() => {
                  ('');
                }}
                type='submit'
                disabled={!(isValid && dirty)}
              >
                Update Profile
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateEnterprise;
