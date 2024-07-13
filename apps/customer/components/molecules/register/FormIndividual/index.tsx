/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 22 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import type { PropsStepper } from '@mtcloud/globals/types';
import { Form, Formik } from 'formik';
import Label from '@mtcloud/ui/atoms/Label';
import TextField from '@mtcloud/ui/atoms/TextInput';
import ErrorMgs from '@mtcloud/ui/atoms/ErrorMessage';
import FileUploadField from '@mtcloud/ui/atoms/FileUploadField';
import IndividualUserData from '@mtcloud/utils/validation/types';
import validatorFunctions, { validateEmail } from '@mtcloud/utils/validation/Signup/Individual';
import countries from '@mtcloud/globals/countries';
import Button from '@mtcloud/ui/atoms/Button';
import Typography from '@mtcloud/ui/atoms/Typography';
import { useRef, useState } from 'react';
import api from 'api';
import toast from 'react-hot-toast';
import { authNavigate } from 'utils/auth';
import { Oval } from 'react-loader-spinner';
import Image from 'next/image';

const userDetailsFields = [
  {
    label: 'First Name *',
    name: 'firstName',
  },
  {
    label: 'Last Name *',
    name: 'lastName',
  },
  {
    label: 'ID Number/ Passport *',
    name: 'idPassport',
  },
  {
    label: 'empty1',
    name: null,
  },
  {
    label: 'Address 1 *',
    name: 'address1',
  },
  {
    label: 'Address 2 *',
    name: 'address2',
  },
  {
    label: 'Email *',
    name: 'email',
  },
  {
    label: 'empty2',
    name: null,
  },
  {
    label: 'Mobile Number *',
    name: 'mobileNumber',
  },
];

const FormIndividual = ({
  step,
  updateStep,
  updateEmail,
  updateMobile,
  updateId,
}: PropsStepper) => {
  const [loading, setStatus] = useState(false);
  const saveUserData = async (data: IndividualUserData) => {
    let prvStep;
    if (typeof window !== 'undefined') {
      prvStep = Number(localStorage.getItem('step'));
    }

    const payload = {
      userType: 'individual',
      userSubType: null,
      created_by: 'sachinw@zone23.com',
      firstName: data.firstName,
      lastName: data.lastName,
      identifier: data.idPassport,
      address1: data.address1,
      address2: data.address2,
      email: data.email,
      mobileNumber: '+230'.concat(data.mobileNumber),
      identifierDoc: data.idPassportFileIn,
      proofOfAddress: data.addressProofIn,
    };
    let response;
    const id = localStorage.getItem('userIdIn');
    if (id !== null && prvStep !== 0) {
      response = await api.register.update(payload, id);
    } else {
      response = await api.register.init(payload);
    }

    if (response.userId) {
      setStatus(false);
      updateEmail(data.email);
      updateId(response.userId);
      localStorage.setItem('userIdIn', response.userId);
      updateMobile('+230'.concat(data.mobileNumber));
      localStorage.setItem('new-userIn', JSON.stringify(data));
      updateStep(step + 1);
    } else {
      setStatus(false);
      toast.error(response, { duration: 8000 });
    }
  };

  const oldEmail = useRef('');
  const isOldEmailValid = useRef(true);

  let userData;
  if (typeof window !== 'undefined') {
    userData = JSON.parse(localStorage.getItem('new-userIn'));
  }

  return (
    <>
      <Formik
        initialValues={userData}
        validate={async (values: IndividualUserData) => {
          let isValidEmail: boolean;
          let emailError = validateEmail(values.email);

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
        {({
          handleSubmit,
          errors,
          touched,
          setFieldValue,
          isValid,
          isValidating,
          dirty,
          setFieldTouched,
        }) => {
          return (
            <Form className='w-full px-3' onSubmit={handleSubmit}>
              <Typography textColorScheme='charcoal' textTypeScheme='h6'>
                User Details
              </Typography>
              <div className='flex-none md:flex'>
                <div className='w-full flex flex-wrap'>
                  {userDetailsFields.map(({ name, label }) => {
                    if (name !== null) {
                      return (
                        <div className='w-full md:w-1/2 px-3' key={name}>
                          <Label
                            name={name}
                            errors={errors[name]}
                            touched={touched[name]}
                            isValidating={isValidating}
                          >
                            {label}
                          </Label>
                          {name === 'mobileNumber' ? (
                            <div className='flex w-full'>
                              <div className='w-1/3 pr-1'>
                                {countries.map((country) => (
                                  <div key={country.name}>
                                    {country.name === 'Mauritius' && (
                                      <div className='flex flex-row items-center py-2 px-2'>
                                        <Image
                                          width={'48px'}
                                          height={'32px'}
                                          src={country.flags['png']}
                                          alt={'Mauritius'}
                                        />
                                        <div>{country.countryCallingCode}</div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                              <div className='w-2/3'>
                                <TextField
                                  type='tel'
                                  name={name}
                                  errors={errors[name]}
                                  touched={touched[name]}
                                  isValidating={isValidating}
                                />
                              </div>
                            </div>
                          ) : (
                            <TextField
                              type='text'
                              name={name}
                              errors={errors[name]}
                              touched={touched[name]}
                              isValidating={isValidating}
                            />
                          )}

                          <ErrorMgs name={name} />
                        </div>
                      );
                    } else {
                      return <div className='md:w-1/2 px-3' key={label} />;
                    }
                  })}
                </div>
              </div>

              <Typography textColorScheme='charcoal' textTypeScheme='h6'>
                Upload your documents
              </Typography>
              <div className='flex-none md:flex'>
                <div className='w-full md:w-1/2 px-3'>
                  <Label
                    name='idPassportFileIn'
                    errors={errors.idPassportFileIn}
                    touched={touched.idPassportFileIn}
                  >
                    ID Card/ Passport *
                  </Label>

                  <FileUploadField
                    name='idPassportFileIn'
                    errors={errors.idPassportFileIn}
                    touched={touched.idPassportFileIn}
                    file={getFile('idPassportFileIn')}
                    onChange={(fileUploaded) => {
                      setFieldValue('idPassportFileIn', fileUploaded);
                      setFieldTouched('idPassportFileIn', true);
                    }}
                  />
                  <ErrorMgs name='idPassportFileIn' />
                </div>
                <div className='w-full md:w-1/2 px-3'>
                  <Label
                    name='addressProofIn'
                    errors={errors.addressProofIn}
                    touched={touched.addressProofIn}
                  >
                    Proof of Address *
                  </Label>
                  <FileUploadField
                    name='addressProofIn'
                    errors={errors.addressProofIn}
                    touched={touched.addressProofIn}
                    file={getFile('addressProofIn')}
                    onChange={(fileUploaded) => {
                      setFieldValue('addressProofIn', fileUploaded);
                      setFieldTouched('addressProofIn', true);
                    }}
                  />
                  <ErrorMgs name='addressProofIn' />
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
                  disabled={
                    !(
                      isValid &&
                      (typeof window !== 'undefined' && localStorage.getItem('userIdIn') !== null
                        ? true
                        : dirty)
                    )
                  }
                >
                  Continue
                </Button>
              </div>
            </Form>
          );
        }}
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
    if (typeof window !== 'undefined' && localStorage.getItem('userIdIn') !== null) {
      return localStorage.getItem(name);
    } else return '';
  }
};
export default FormIndividual;
