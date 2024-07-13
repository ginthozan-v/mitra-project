/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 25 April 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import type { PropsStepper } from '@mtcloud/globals/types';
import { Form, Formik } from 'formik';
import Label from '@mtcloud/ui/atoms/Label';
import TextField from '@mtcloud/ui/atoms/TextInput';
import ErrorMgs from '@mtcloud/ui/atoms/ErrorMessage';
import FileUploadField from '@mtcloud/ui/atoms/FileUploadField';
import { IndividualUpdateUserData } from '@mtcloud/utils/validation/types';
import validatorFunctions from '@mtcloud/utils/validation/UpdateProfile/Individual';
import Button from '@mtcloud/ui/atoms/Button';
import countries from '@mtcloud/globals/countries';
import { parsePhoneNumber } from 'libphonenumber-js';
import { isLoggedIn } from 'utils/auth';
import { useEffect, useState } from 'react';
import api from 'api';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import Typography from '@mtcloud/ui/atoms/Typography';
import Image from 'next/image';
import { isValid } from 'date-fns';
import { NETWORK_STATUS_CODES } from '@/constants';

const userDetailsFields = [
  {
    label: 'First Name *',
    name: 'firstName',
    disable: false,
  },
  {
    label: 'Last Name *',
    name: 'lastName',
    disable: false,
  },
  {
    label: 'ID Number/ Passport *',
    name: 'idPassport',
    disable: false,
  },
  {
    label: 'Address 1 *',
    name: 'address1',
    disable: false,
  },
  {
    label: 'Address 2 *',
    name: 'address2',
    disable: false,
  },
  {
    label: 'Email *',
    name: 'email',
    disable: true,
  },
  {
    label: 'Mobile Number *',
    name: 'mobileNumber',
    disable: false,
  },
];

const UpdateIndividual = ({ step, updateStep }: PropsStepper) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());
  const [loading, setStatus] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  let authObj;
  let userId;
  let phoneNumber;
  let identifierDoc;
  let identifierDocType;
  let proofOfAddressDoc;
  let proofOfAddressDocType;
  let firstName;
  let lastName;
  if (typeof window !== 'undefined') {
    if (isAuthenticated) {
      if (localStorage.getItem('update-user') === null) {
        authObj = localStorage.getItem('logged-user');
        authObj = JSON.parse(authObj);
        userId = localStorage.getItem('mt-user');
        userId = JSON.parse(userId);
        phoneNumber = parsePhoneNumber(authObj['mobileNo']);

        const intF = 'data:application/pdf;base64,';
        identifierDoc = intF + authObj['identifierDoc'][1];
        identifierDocType = authObj['identifierDoc'][0];
        proofOfAddressDoc = intF + authObj['proofOfAddressDoc'][1];
        proofOfAddressDocType = authObj['proofOfAddressDoc'][0];
        firstName = authObj['firstName'];
        lastName = authObj['lastName'];
      } else {
        authObj = localStorage.getItem('update-user');
        authObj = JSON.parse(authObj);
        userId = localStorage.getItem('mt-user');
        userId = JSON.parse(userId);
        phoneNumber = parsePhoneNumber(authObj['mobile_no']);
        identifierDoc = authObj['identifierDocument'];
        identifierDocType = identifierDoc.split(';')[0].split('/')[1];
        proofOfAddressDoc = authObj['proofOfAddress'];
        proofOfAddressDocType = proofOfAddressDoc.split(';')[0].split('/')[1];
        firstName = authObj['first_name'];
        lastName = authObj['last_name'];
      }
    }
  }

  const saveUserData = async (data: IndividualUpdateUserData) => {
    const payload = {
      first_name: data.firstName,
      last_name: data.lastName,
      country: 'Mauritius',
      identifier: data.idPassport,
      address1: data.address1,
      address2: data.address2,
      email: data.email,
      mobile_no: '+230'.concat(data.mobileNumber),
      identifierDocument: data.idPassportFile,
      proofOfAddress: data.addressProof,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('update-user', JSON.stringify(payload));
    }

    const otpPayload = {
      action: 'PROFILE_UPDATE',
      type: 'SMS',
      userId: userId['externalid'],
    };
    const res = await api.register.otpInit(otpPayload);
    if (res === true) {
      setStatus(false);
      updateStep(step + 1);
    } else {
      if (!NETWORK_STATUS_CODES.includes(res.code)) {
        setStatus(false);
        toast.error('SMS OTP sending failed', { duration: 8000 });
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
          firstName: firstName,
          lastName: lastName,
          address1: authObj['address1'],
          address2: authObj['address2'],
          idPassport: authObj['identifier'],
          email: authObj['email'],
          mobileNumber: phoneNumber.nationalNumber,
          idPassportFile: identifierDoc,
          addressProof: proofOfAddressDoc,
        }}
        validate={(values: IndividualUpdateUserData) => {
          return validatorFunctions.reduce((acc, func) => {
            const errorData = func(values);
            return { ...acc, ...errorData };
          }, {});
        }}
        onSubmit={async (values) => {
          setStatus(true);
          await saveUserData(values);
        }}
      >
        {({ handleSubmit, errors, touched, dirty, isValid, setFieldValue, setFieldTouched }) => (
          <Form className='mx-auto max-w-7xl flex flex-col w-full md:w-96' onSubmit={handleSubmit}>
            <Typography textColorScheme='charcoal' textTypeScheme='h6'>
              User Details
            </Typography>
            <div className='flex-none md:flex'>
              <div className='w-full flex flex-wrap'>
                {userDetailsFields.map(({ name, label, disable }) => {
                  return (
                    <div className='w-full px-3' key={name}>
                      <Label name={name} errors={errors[name]} touched={touched[name]}>
                        {label}
                      </Label>
                      {name === 'mobileNumber' ? (
                        <div className='flex w-full'>
                          <div className='w-1/3 pr-1'>
                            {countries.map((country) => (
                              <div key={country.name}>
                                {country.name === 'Mauritius' && (
                                  <div className='flex flex-row items-center py-2 px-2'>
                                    <Image width={'48px'} height={'32px'} src={country.flags['png']} alt={'Mauritius'} />
                                    <div>{country.countryCallingCode}</div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className='w-2/3'>
                            <TextField type='tel' name={name} errors={errors[name]} touched={touched[name]} disable={disable} />
                          </div>
                        </div>
                      ) : (
                        <TextField type='text' name={name} errors={errors[name]} touched={touched[name]} disable={disable} />
                      )}
                      <ErrorMgs name={name} />
                    </div>
                  );
                })}
              </div>
            </div>{' '}
            <Typography textColorScheme='charcoal' textTypeScheme='h6'>
              Upload Your Documents
            </Typography>{' '}
            <div className='flex-none md:flex'>
              <div className='w-full flex flex-wrap'>
                <div className='w-full px-3'>
                  <Label name='idPassportFile' errors={errors.idPassportFile} touched={touched.idPassportFile}>
                    ID Card/Passport *
                  </Label>
                  <FileUploadField
                    name='idPassportFile'
                    errors={errors.idPassportFile}
                    touched={touched.idPassportFile}
                    file={identifierDoc?.length !== 0 ? 'idPassportFile.' + identifierDocType : ''}
                    onChange={(fileUploaded) => {
                      setFieldValue('idPassportFile', fileUploaded);
                      setFieldTouched('idPassportFile', true);
                    }}
                  />
                  <ErrorMgs name='idPassportFile' />
                </div>
                <div className='w-full px-3'>
                  <Label name='addressProof' errors={errors.addressProof} file={''} touched={touched.addressProof}>
                    Proof of Address *
                  </Label>
                  <FileUploadField
                    name='addressProof'
                    errors={errors.addressProof}
                    touched={touched.addressProof}
                    file={proofOfAddressDoc?.length !== 0 ? 'addressProof.' + proofOfAddressDocType : ''}
                    onChange={(fileUploaded) => {
                      setFieldValue('addressProof', fileUploaded);
                      setFieldTouched('addressProof', true);
                    }}
                  />
                  <ErrorMgs name='addressProof' />
                </div>
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
                disabled={!(dirty && isValid) && ((typeof window !== 'undefined' && localStorage.getItem('update-user') === null) || !isValid)}
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

export default UpdateIndividual;
