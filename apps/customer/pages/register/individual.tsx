/*
 * File: individual.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 21 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { useEffect, useState } from 'react';
import AuthLayout from 'components/layouts/AuthLayout';
import Stepper from 'components/molecules/register/Stepper';
import Tabs from 'components/molecules/register/Tabs';
import SEO from 'components/utils/SEO';
import FormIndividual from 'components/molecules/register/FormIndividual';
import OTP from 'components/molecules/register/OTP';
import type { PropsStepper } from '@mtcloud/globals/types';
import Password from 'components/molecules/register/Password';
import CompletionIndividual from 'components/atoms/CompletionIndividual';
import { StErrorIcon, StSuccessIcon } from '@mtcloud/ui/atoms/icons';
import { authNavigate } from 'utils/auth';
import { useRouter } from 'next/router';
import { ROUTE_CONTACT } from 'constants/routes';
import payload from 'constants/registration/user';

const Individual = () => {
  const [step, setStep] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [userId, setUserId] = useState('');
  const [isPwdCreated, setPawdCreated] = useState(false);
  const [isError, setError] = useState(false);
  const router = useRouter();

  const routeChangeComplete = (path: string) => {
    if (path.startsWith('/register')) {
      localStorage.setItem('new-userEn', JSON.stringify(payload.payloadEn));
      localStorage.setItem('new-userIn', JSON.stringify(payload.payloadIn));
      localStorage.removeItem('step');
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
  };
  useEffect(() => {
    router.events.on('routeChangeComplete', routeChangeComplete);
  }, [router.events]);

  const updateState = (newState: number) => {
    setStep(newState);
  };

  const updateUserEmail = (newEmail: string) => {
    setUserEmail(newEmail);
  };

  const updateUserMobile = (newMobile: string) => {
    setUserMobile(newMobile);
  };

  const updateUserId = (newUserId: string) => {
    setUserId(newUserId);
  };

  const updateUserPwdState = (newVal: boolean) => {
    setPawdCreated(newVal);
  };

  const updateErrorState = (newVal: boolean) => {
    setError(newVal);
  };

  if (typeof window !== 'undefined') {
    window.onbeforeunload = function () {
      localStorage.setItem('new-userEn', JSON.stringify(payload.payloadEn));
      localStorage.setItem('new-userIn', JSON.stringify(payload.payloadIn));
      localStorage.removeItem('step');
      localStorage.removeItem('userIdEn');
      localStorage.removeItem('userIdIn');
      localStorage.removeItem('idPassportFile');
      localStorage.removeItem('idPassportFileIn');
      localStorage.removeItem('businessRegCertificate');
      localStorage.removeItem('addressProof');
      localStorage.removeItem('addressProofIn');
      localStorage.removeItem('incorporation');
      localStorage.removeItem('VAT');
    };
  }
  return (
    <>
      <SEO title='Register | Individual' desc='Individual Description' />
      <h1 className='mt-3 text-3xl font-semibold'>{step !== 4 ? 'Registration' : ''}</h1>
      {step < 4 ? (
        <>
          <Tabs isIndividual />
          <Stepper step={step} isIndividual updateStep={updateState} />
        </>
      ) : null}

      <StepFilter
        step={step}
        updateStep={updateState}
        updateEmail={updateUserEmail}
        updateMobile={updateUserMobile}
        updateId={updateUserId}
        updatePwdState={updateUserPwdState}
        updateError={updateErrorState}
        userEmail={userEmail}
        userMobile={userMobile}
        userId={userId}
        isPwdCreated={isPwdCreated}
        isError={isError}
      />
    </>
  );
};

Individual.Layout = AuthLayout;
Individual.TopStack = false;

export default Individual;

function StepFilter({
  step,
  updateStep,
  userEmail,
  userMobile,
  userId,
  isPwdCreated,
  isError,
  updateEmail,
  updateMobile,
  updateId,
  updatePwdState,
  updateError,
}: PropsStepper) {
  const router = useRouter();
  if (step === 0) {
    return <FormIndividual step={step} updateStep={updateStep} updateEmail={updateEmail} updateMobile={updateMobile} updateId={updateId} />;
  }
  if (step === 1) {
    return <OTP step={step} updateStep={updateStep} key='email' userEmail={userEmail} userMobile={userMobile} userId={userId} />;
  }
  if (step === 2) {
    return <OTP step={step} updateStep={updateStep} isMobile key='mobile' userMobile={userMobile} userId={userId} />;
  }
  if (step === 3) {
    return <Password step={step} updateStep={updateStep} userId={userId} isIndividual updatePwdState={updatePwdState} updateError={updateError} />;
  }
  if (step === 4) {
    return (
      <CompletionIndividual
        title1={isPwdCreated ? 'Registration Success' : 'Sorry, something went wrong.'}
        successMgs={
          isPwdCreated
            ? 'Congratulations, your account has been created successfully.'
            : isError
            ? 'User account created partially. You can logged in but some functions are restricted for you. Our administrators are working on this issue. You will be informed once issue is resolved.'
            : 'Please contact our customer support center.'
        }
        button1Text={isPwdCreated ? 'Continue' : isError ? 'Continue' : 'Contact Us'}
        className='font-medium'
        button1Action={
          isPwdCreated
            ? authNavigate
            : isError
            ? authNavigate
            : () => {
                router.push(ROUTE_CONTACT);
              }
        }
      >
        {isPwdCreated ? <StSuccessIcon className='w-48 h-48 mt-10' /> : <StErrorIcon className='w-48 h-48 mt-10' />}
      </CompletionIndividual>
    );
  }

  return null;
}
