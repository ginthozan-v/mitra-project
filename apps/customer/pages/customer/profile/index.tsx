/*
 * File: profile.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 23 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { PropsStepper } from '@mtcloud/globals/types';
import AuthGuard from 'components/utils/AuthGuard';
import MainLayout from 'components/layouts/MainLayout';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import Stepper from 'components/molecules/myAccount/Stepper';
import SEO from 'components/utils/SEO';
import { useEffect, useState } from 'react';
import { getAuth } from 'utils/auth';
import Success from 'components/atoms/CompletionIndividual';
import api from 'api';
import toast from 'react-hot-toast';
import UpdateIndividual from 'components/molecules/myAccount/UpdateIndividual';
import UpdateEnterprise from 'components/molecules/myAccount/UpdateEnterprise';
import OTP from 'components/molecules/myAccount/OTP';
import { useRouter } from 'next/router';
import { Oval } from 'react-loader-spinner';
import { StErrorIcon, StSuccessIcon } from '@mtcloud/ui/atoms/icons';
import { ROUTE_SUPPORT_NEW } from 'constants/routes';
import useStore from '@/store';

const Profile = () => {
  const [step, setStep] = useState(0);
  const [isIndividual, setUserType] = useState(true);
  const [isMount, setMount] = useState(false);
  const [isUpdated, setUpdated] = useState(false);
  const router = useRouter();
  const [loading, setStatus] = useState(false);
  const status = useStore((state) => state.status);

  useEffect(() => {
    setMount(true);

    if (getAuth().userType === 'individual') {
      setUserType(true);
    } else {
      setUserType(false);
    }
  }, []);

  const updateState = (newState: number) => {
    setStep(newState);
  };

  const updateProfile = (newVal: boolean) => {
    setUpdated(newVal);
  };

  const getData = async () => {
    setStatus(true);
    try {
      const res = await api.register.getUser();
      if (typeof window !== 'undefined') {
        localStorage.setItem('logged-user', JSON.stringify(res));
        updateState(0);
      }
      setStatus(false);
    } catch (error) {
      setStatus(false);
      toast.error('Something went wrong');
    }
  };

  const setPath = (path: string) => {
    router.push(path);
  };

  let userId;

  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('mt-user');
    userId = JSON.parse(userId);
  }
  return (
    isMount && (
      <>
        <SEO title='Profile' desc='Profile Description' />
        <ItemDescription title='Profile Update' type='TitleBannerSlim' image='/bgsample-mt.jpg' />
        {status === 'CREATIO_FAILED' ? (
          <div className='text-center mt-24 text-lg'>
            Sorry, you are not allowed to update your profile since your account has not been activated yet.
          </div>
        ) : (
          <div>
            {step < 2 && isIndividual ? <Stepper step={step} updateStep={updateState} /> : null}

            <StepFilter
              step={step}
              updateStep={updateState}
              updatePwdState={updateProfile}
              isIndividual={isIndividual}
              isPwdCreated={isUpdated}
              userId={userId['externalid']}
              userMobile={userId['mobileNo']}
              getData={getData}
              loading={loading}
              setPath={setPath}
            />
          </div>
        )}
      </>
    )
  );
};

Profile.Layout = MainLayout;

export default AuthGuard(Profile);

function StepFilter({ step, updateStep, updatePwdState, getData, setPath, loading, isIndividual, isPwdCreated, userId, userMobile }: PropsStepper) {
  if (step === 0) {
    return <StepZero step={step} updateStep={updateStep} isIndividual={isIndividual} />;
  }
  if (step === 1) {
    return (
      <StepOne
        step={step}
        updateStep={updateStep}
        isIndividual={isIndividual}
        updatePwdState={updatePwdState}
        userMobile={userMobile}
        userId={userId}
      />
    );
  }
  if (step === 2) {
    return <StepTwo step={step} isIndividual={isIndividual} loading={loading} isPwdCreated={isPwdCreated} getData={getData} setPath={setPath} />;
  }
  return null;
}

const StepZero = ({ step, updateStep, isIndividual }: PropsStepper) => {
  if (isIndividual) {
    return <UpdateIndividual step={step} updateStep={updateStep} />;
  } else return <UpdateEnterprise step={step} updateStep={updateStep} />;
};

const StepOne = ({ step, updateStep, isIndividual, updatePwdState, userMobile, userId }: PropsStepper) => {
  if (isIndividual) {
    return <OTP step={step} updateStep={updateStep} updatePwdState={updatePwdState} userMobile={userMobile} userId={userId} />;
  } else {
    updatePwdState(true);
    updateStep(step + 1);
    return null;
  }
};

const StepTwo = ({ step, isIndividual, loading, isPwdCreated, getData, setPath }: PropsStepper) => {
  if (isIndividual) {
    return (
      <>
        <Loader loading={loading} step={step} />
        <Success
          title1={isPwdCreated ? 'Profile Update Success' : 'Sorry, something went wrong.'}
          successMgs={isPwdCreated ? 'Congratulations, your profile has been updated successfully.' : 'Please contact our customer support center.'}
          button1Text={butonText({ step, isPwdCreated })}
          button1Action={linkSet({ step, isPwdCreated, setPath, getData })}
        >
          <IconSetter step={step} isPwdCreated={isPwdCreated} />
        </Success>
      </>
    );
  } else {
    return (
      <>
        <Loader loading={loading} step={step} />
        <Success
          title1={isPwdCreated ? 'Profile Update Request Sent' : 'Sorry, something went wrong.'}
          successMgs={
            isPwdCreated ? 'Our agents will review your request and get back to you shortly.' : 'Please contact our customer support center.'
          }
          mgs={isPwdCreated && ' Changes will be reflected once your request is approved.'}
          button1Text={butonText({ step, isPwdCreated })}
          className='font-medium'
          button1Action={linkSet({ step, isPwdCreated, setPath, getData })}
        >
          <IconSetter step={step} isPwdCreated={isPwdCreated} />
        </Success>
      </>
    );
  }
};

const Loader = ({ loading }: PropsStepper) => {
  return (
    <div>
      {loading && (
        <div className='grid place-items-center fixed inset-y-0 inset-x-0 overflow-y-auto bg-slate-100/[0.3] z-[1000]'>
          <Oval
            color='#00aeef'
            secondaryColor='#fff'
            width={70}
            strokeWidth={3}
            wrapperStyle={{ filter: 'drop-shadow(3px 3px 6px rgb(0 0 0 / 0.8))' }}
          />
        </div>
      )}
    </div>
  );
};

const linkSet = ({ isPwdCreated, getData, setPath }: PropsStepper) => {
  return isPwdCreated
    ? () => {
        getData();
      }
    : () => {
        setPath(ROUTE_SUPPORT_NEW);
      };
};

const IconSetter = ({ isPwdCreated }: PropsStepper) => {
  return <div>{isPwdCreated ? <StSuccessIcon className='w-48 h-48 mt-10' /> : <StErrorIcon className='w-48 h-48 mt-10' />}</div>;
};

const butonText = ({ isPwdCreated }: PropsStepper) => {
  if (isPwdCreated) {
    return 'Done';
  } else {
    return 'Support';
  }
};
