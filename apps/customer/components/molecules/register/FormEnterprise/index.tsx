/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 22 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import type { PropsStepper } from '@mtcloud/globals/types';
import { EnterpriseUserData } from '@mtcloud/utils/validation/types';
import validatorFunctions, { validateEmail } from '@mtcloud/utils/validation/Signup/Enterprise';
import { Form, Formik } from 'formik';
import Typography from '@mtcloud/ui/atoms/Typography';
import Label from '@mtcloud/ui/atoms/Label';
import TextField from '@mtcloud/ui/atoms/TextInput';
import CountrySelect from '@mtcloud/ui/atoms/CountrySelect';
import CountryCodeSelect from '@mtcloud/ui/atoms/CountryCodeSelect';
import Button from '@mtcloud/ui/atoms/Button';
import ErrorMgs from '@mtcloud/ui/atoms/ErrorMessage';
import FileUploadField from '@mtcloud/ui/atoms/FileUploadField';
import InputInfo from '@mtcloud/ui/atoms/InputInfo';
import { MinusIcon, PlusIcon } from '@mtcloud/ui/atoms/icons';
import SelectField from '@mtcloud/ui/atoms/Selector';
import { useRef, useState } from 'react';
import api from 'api';
import toast from 'react-hot-toast';
import { authNavigate } from 'utils/auth';
import useCountry from 'components/hooks/useCountry';
import { Oval } from 'react-loader-spinner';

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
    name: 'country',
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
    label: 'Mobile Number * ',
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

let emailError: string;

const FormEnterprise = ({
  step,
  updateStep,
  updateEmail,
  updateMobile,
  updateId,
}: PropsStepper) => {
  const [showAdditionalField, setShowAdditionalField] = useState(false);
  const countries = useCountry();
  const [loading, setStatus] = useState(false);

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

  const saveUserData = async (data: EnterpriseUserData) => {
    let prvStep;
    if (typeof window !== 'undefined') {
      prvStep = Number(localStorage.getItem('step'));
    }
    let additionalNumber;
    if (data.additionalMobileNumber === '') {
      additionalNumber = data.additionalMobileNumber;
    } else {
      additionalNumber = data.additionalMobileNumberCountryCode.concat(data.additionalMobileNumber);
    }
    const payload = {
      userType: 'enterprise',
      userSubType: 'internal',
      created_by: 'sachinw@zone23.com',
      companyName: data.companyName,
      businessRegistrationNumber: data.businessRegNumber,
      companyAddress: data.companyAddress,
      country: data.country,
      firstName: data.firstName,
      lastName: data.lastName,
      identifier: data.idPassport,
      designation: data.designation,
      email: data.email,
      mobileNumber: data.countryCode.concat(data.mobileNumber),
      additionalFirstName: data.additionalFirstName,
      additionalLastName: data.additionalLastName,
      additionalIdentifier: data.additionalIdPassport,
      additionalDesignation: data.additionalDesignation,
      additionalEmail: data.additionalEmail,
      additionalMobileNo: additionalNumber,
      identifierDoc: data.idPassportFile,
      proofOfAddress: data.addressProof,
      brnDocument: data.businessRegCertificate,
      vatCertificate: data.VAT,
      inCorpCertificate: data.incorporation,
    };
    let response;
    const id = localStorage.getItem('userIdEn');

    if (id !== null && prvStep !== 0) {
      response = await api.register.update(payload, id);
    } else {
      response = await api.register.init(payload);
    }

    if (response.userId) {
      setStatus(false);
      updateEmail(data.email);
      updateId(response.userId);
      localStorage.setItem('userIdEn', response.userId);
      updateMobile(data.countryCode.concat(data.mobileNumber));
      localStorage.setItem('new-userEn', JSON.stringify(data));

      updateStep(step + 1);
    } else {
      setStatus(false);
      toast.error('Failed user data saving', { duration: 8000 });
    }
  };

  const oldEmail = useRef('');
  const isOldEmailValid = useRef(true);
  let userData;
  if (typeof window !== 'undefined') {
    userData = JSON.parse(localStorage.getItem('new-userEn'));
  }

  return (
    <>
      <Formik
        initialValues={userData}
        enableReinitialize
        validate={async (values: EnterpriseUserData) => {
          let isValidEmail: boolean;
          emailError = validateEmail(values.email);
          if (emailError === '') {
            isValidEmail = isOldEmailValid.current;
            if (!isValidEmail) {
              emailError = 'This email is already in use.';
            }
            if (values.email !== oldEmail.current) {
              isValidEmail = await api.register.verifyEmail(encodeURIComponent(values.email));
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
        {({ handleSubmit, errors, touched, setFieldValue, dirty, isValid, setFieldTouched }) => (
          <Form className='w-full px-3' onSubmit={handleSubmit}>
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
                    {name === 'country' ? (
                      <CountrySelect name={name} options={countryOptions} />
                    ) : (
                      <TextField
                        type='text'
                        name={name}
                        errors={errors[name]}
                        touched={touched[name]}
                        component={component}
                        options={options}
                      />
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
                {adminContactFields.map(
                  ({ name, label, info, component, optionalParameters = {} }) => (
                    <div className='w-full md:w-1/2 px-3' key={name}>
                      <Label name={name} errors={errors[name]} touched={touched[name]}>
                        {label}
                      </Label>
                      {name === 'mobileNumber' ? (
                        <div className='flex w-full'>
                          <div className='w-2/5 pr-1'>
                            <CountryCodeSelect
                              name='countryCode'
                              type='tel'
                              options={countryCodeOptions}
                            />
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
                  ),
                )}
              </div>
            </div>

            <Typography
              textColorScheme='charcoal'
              textTypeScheme='h6'
              className='flex flex-row justify-between pr-5'
            >
              Additional Contact Details
              <div className='pt-2' onClick={() => setShowAdditionalField(!showAdditionalField)}>
                {showAdditionalField ? (
                  <MinusIcon className='w-4 h-4 cursor-pointer' />
                ) : (
                  <PlusIcon className='w-4 h-4 cursor-pointer' />
                )}
              </div>
            </Typography>
            {showAdditionalField ? (
              <div className='flex-none md:flex'>
                <div className='w-full flex flex-wrap'>
                  {additionalContactFields.map(
                    ({ name, label, component, optionalParameters = {} }) => (
                      <div className='w-full md:w-1/2 px-3' key={name}>
                        <Label name={name} errors={errors[name]} touched={touched[name]}>
                          {label}
                        </Label>
                        {name === 'additionalMobileNumber' ? (
                          <div className='flex w-full'>
                            <div className='w-2/5 pr-1'>
                              <CountryCodeSelect
                                type='number'
                                name='additionalMobileNumberCountryCode'
                                options={countryCodeOptions}
                              />
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

                        <ErrorMgs name={name} />
                      </div>
                    ),
                  )}
                </div>
              </div>
            ) : null}

            <Typography textColorScheme='charcoal' textTypeScheme='h6'>
              Upload your documents
            </Typography>

            <div className='flex-none md:flex'>
              <div className='w-full md:w-1/2 px-3'>
                <Label
                  name='idPassportFile'
                  errors={errors.idPassportFile}
                  touched={touched.idPassportFile}
                >
                  ID Card/ Passport *
                </Label>
                <FileUploadField
                  name='idPassportFile'
                  errors={errors.idPassportFile}
                  touched={touched.idPassportFile}
                  file={getFile('idPassportFile')}
                  onChange={(fileUploaded) => {
                    setFieldValue('idPassportFile', fileUploaded);
                    setFieldTouched('idPassportFile', true);
                  }}
                />
                <ErrorMgs name='idPassportFile' />
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <Label
                  name='businessRegCertificate'
                  errors={errors.businessRegCertificate}
                  touched={touched.businessRegCertificate}
                >
                  Business Registration Certificate *
                </Label>
                <FileUploadField
                  name='businessRegCertificate'
                  errors={errors.businessRegCertificate}
                  touched={touched.businessRegCertificate}
                  file={getFile('businessRegCertificate')}
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
                <Label
                  name='addressProof'
                  errors={errors.addressProof}
                  touched={touched.addressProof}
                >
                  Proof of Address *
                </Label>
                <FileUploadField
                  name='addressProof'
                  errors={errors.addressProof}
                  touched={touched.addressProof}
                  file={getFile('addressProof')}
                  onChange={(fileUploaded) => {
                    setFieldValue('addressProof', fileUploaded);
                    setFieldTouched('addressProof', true);
                  }}
                />
                <ErrorMgs name='addressProof' />
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <Label
                  name='incorporation'
                  errors={errors.incorporation}
                  touched={touched.incorporation}
                >
                  Certificate of Incorporation
                </Label>
                <FileUploadField
                  name='incorporation'
                  errors={errors.incorporation}
                  touched={touched.incorporation}
                  file={getFile('incorporation')}
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
                  file={getFile('VAT')}
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
                onClick={() => ''}
                type='submit'
                disabled={
                  !(
                    isValid &&
                    (typeof window !== 'undefined' && localStorage.getItem('userIdEn') !== null
                      ? true
                      : dirty)
                  )
                }
              >
                Continue
              </Button>
            </div>
          </Form>
        )}
      </Formik>
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

      <div className='inline-flex'>
        <div className='text-gray-700'>Already have an account?</div>

        <button
          className='inline-flex items-center ml-4 text-mtgreen font-semibold'
          onClick={authNavigate}
        >
          <div>Log In</div>
        </button>
      </div>
    </>
  );
};
const getFile = (name: string) => {
  {
    if (typeof window !== 'undefined' && localStorage.getItem('userIdEn') !== null) {
      return localStorage.getItem(name);
    } else return '';
  }
};
export default FormEnterprise;
