/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Tuesday, 29 March 2022 02:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { PropsStepper } from '@mtcloud/globals/types';
import Label from '@mtcloud/ui/atoms/Label';
import PasswordField from '@mtcloud/ui/atoms/PasswordField';
import FacesRenderer from '@mtcloud/ui/atoms/PasswordField/FacesRenderer';
import { PasswordData, Errors } from '@mtcloud/utils/validation/types';
import validatorFunctions from '@mtcloud/utils/validation/Signup/Password';
import { Form, Formik } from 'formik';
import CheckBox from '@mtcloud/ui/atoms/CheckBox';
import Button from '@mtcloud/ui/atoms/Button';
import React, { useEffect, useState } from 'react';
import ErrorMgs from '@mtcloud/ui/atoms/ErrorMessage';
import api from 'api';
import toast from 'react-hot-toast';
import TermsAndConditions from 'components/atoms/TermsAndConditions';
import PrivacyPolicy from 'components/atoms/PrivacyPolicy';
import { GENERIC_CONTENT } from 'api/generic-contents';
import { useRouter } from 'next/router';

const Password = ({ step, updateStep, userId, isIndividual, updatePwdState, updateError }: PropsStepper) => {
  const [showModal, setShowModal] = useState(false);
  const [modalName, setModalName] = useState('');
  const [genericContent, setGenericContent] = useState({
    terms: { en: '', fr: '' },
    privacyPolicy: { en: '', fr: '' },
  });
  const { locale } = useRouter();

  if (typeof window !== 'undefined') {
    localStorage.setItem('step', step.toString());
  }

  useEffect(() => {
    api.genericContents.get(GENERIC_CONTENT.TERMS_CONDITIONS).then((res) => {
      setGenericContent({ terms: res?.termsnCondition, privacyPolicy: res?.privacyPolicy });
    });
  }, []);

  const setModal = (name: string) => {
    setModalName(name);
    setShowModal(true);
  };
  const savePassword = async (data: PasswordData) => {
    const payload = {
      userId: userId,
      password: data.password,
      tnc: data.privacy,
      newsletter: data.newsLetter,
    };
    const response = await api.register.passwordSubmit(payload);
    if (response === 'USER_PARTIALLY_CREATED') {
      toast.error('Something went wrong', { duration: 8000 });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('step');
        localStorage.removeItem('new-userEn');
        localStorage.removeItem('new-userIn');
        localStorage.removeItem('userIdEn');
        localStorage.removeItem('userIdIn');
        localStorage.removeItem('idPassportFile');
        localStorage.removeItem('businessRegCertificate');
        localStorage.removeItem('addressProof');
        localStorage.removeItem('incorporation');
        localStorage.removeItem('VAT');
      }
      updatePwdState(false);
      updateError(true);
      updateStep(step + 1);
    } else if (response) {
      !isIndividual && toast.success('Please wait while we activate your account.', { duration: 8000 });
      updatePwdState(true);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('step');
        localStorage.removeItem('new-userEn');
        localStorage.removeItem('new-userIn');
        localStorage.removeItem('userIdEn');
        localStorage.removeItem('userIdIn');
        localStorage.removeItem('idPassportFile');
        localStorage.removeItem('idPassportFileIn');
        localStorage.removeItem('businessRegCertificate');
        localStorage.removeItem('addressProof');
        localStorage.removeItem('addressProofIn');
        localStorage.removeItem('incorporation');
        localStorage.removeItem('VAT');
      }
      updateStep(step + 1);
    } else {
      toast.error('Password Creation Failed', { duration: 8000 });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('step');
        localStorage.removeItem('new-userEn');
        localStorage.removeItem('new-userIn');
        localStorage.removeItem('userIdEn');
        localStorage.removeItem('userIdIn');
        localStorage.removeItem('idPassportFile');
        localStorage.removeItem('businessRegCertificate');
        localStorage.removeItem('addressProof');
        localStorage.removeItem('incorporation');
        localStorage.removeItem('VAT');
      }
      updatePwdState(false);
      updateError(false);
      updateStep(step + 1);
    }
  };

  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
        privacy: false,
        newsLetter: false,
      }}
      validate={(values: PasswordData) => {
        return validatorFunctions.reduce((acc, func) => {
          let errorData = func(values);
          if (errorData.password && errorData.password.length === 0) {
            errorData = {};
          }
          return { ...acc, ...errorData };
        }, {});
      }}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        await savePassword(values);
      }}
    >
      {({ handleSubmit, errors, touched, isValid, dirty, isSubmitting }) => (
        <Form className='mx-auto w-80 md:w-96' onSubmit={handleSubmit}>
          <Label name='password' errors={errors.password} touched={touched.password}>
            Password *
          </Label>
          <PasswordField name='password' errors={errors.password} touched={touched.password} />
          <span className='text-[#EA0000] text-xs font-normal order-2 self-stretch'>
            {errors.password?.length && touched.password ? 'Password didn’t meet expected criteria' : ''}
          </span>
          <div className='bg-[#F4F4F4] shadow-md rounded text-[#535353] font-normal h-20 md:h-28 p-1 md:p-3 md:text-sm text-xs'>
            <p>
              <span className='inline-block align-middle'>
                <FacesRenderer errors={errors} currentError={Errors.specialCharacter} touched={touched.password} />
              </span>
              <span className='inline-block align-middle px-px md:px-2'>Must contain at least one special character</span>
            </p>

            <p>
              <span className='inline-block align-middle'>
                <FacesRenderer errors={errors} currentError={Errors.uppercase} touched={touched.password} />
              </span>
              <span className='inline-block align-middle px-px md:px-2'>Must contain at least one upper case character</span>
            </p>
            <p>
              <span className='inline-block align-middle'>
                <FacesRenderer errors={errors} currentError={Errors.digit} touched={touched.password} />
              </span>
              <span className='inline-block align-middle px-px md:px-2'>Must contain at least one number</span>
            </p>
            <p>
              <span className='inline-block align-middle'>
                <FacesRenderer errors={errors} currentError={Errors.size} touched={touched.password} />
              </span>
              <span className='inline-block align-middle px-px md:px-2'>Must be at least eight characters long</span>
            </p>
          </div>
          <Label name='confirmPassword' errors={errors.confirmPassword} touched={touched.confirmPassword}>
            Confirm Password *
          </Label>
          <PasswordField name='confirmPassword' errors={errors.confirmPassword} touched={touched.confirmPassword} />
          <ErrorMgs name='confirmPassword' />
          <div className='my-2.5'>
            <span className='inline-block align-middle'>
              <CheckBox name='privacy' />
            </span>

            <label className='ml-2.5 text-[#474747] text-base font-medium'>
              I confirm that I have read, confirm and agree to the{' '}
              <button className='text-mtgreen' onClick={() => setModal('terms')} type='button'>
                Terms and Conditions
              </button>
              {' and '}
              <button className='text-mtgreen' onClick={() => setModal('privacy')} type='button'>
                Privacy Policy
              </button>
            </label>
            <ErrorMgs name='privacy' />
          </div>
          <div className='my-2.5'>
            <span className='inline-block align-middle'>
              <CheckBox name='newsLetter' />
            </span>

            <label className='ml-2.5 text-[#474747] text-base font-medium'>Subscribe to our newsletter.</label>

            {showModal && modalName === 'terms' ? (
              <TermsAndConditions content={genericContent?.terms?.[locale]} show={showModal} setVisibility={setShowModal} />
            ) : (
              <PrivacyPolicy content={genericContent?.privacyPolicy?.[locale]} show={showModal} setVisibility={setShowModal} />
            )}
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
              disabled={!(isValid && dirty && !isSubmitting)}
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Password;
