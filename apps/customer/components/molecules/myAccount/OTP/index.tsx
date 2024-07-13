/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 22 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { NETWORK_STATUS_CODES } from '@/constants';
import type { PropsStepper } from '@mtcloud/globals/types';
import OTPInput from '@mtcloud/ui/atoms/OTPField';
import Timer from '@mtcloud/ui/atoms/OTPField/Timer';
import api from 'api';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';

const OTP = ({ step, updateStep, updatePwdState, userMobile, userId }: PropsStepper) => {
  const [isDisabled, setDisable] = useState(false);
  const [isResend, setResend] = useState(false);
  const [isValid, setValid] = useState(true);
  const [loading, setStatus] = useState(false);

  const otpMgs = `Please enter the verification code you received
on `;
  const updateState = (newState: boolean) => {
    setDisable(newState);
  };
  const updateResend = (newState: boolean) => {
    setResend(newState);
    setValid(true);
  };

  const onChange = async (otp: string) => {
    if (otp.length === 6) {
      setStatus(true);
      setResend(false);
      const response = await api.register.verifyOTP({
        userId: userId,
        type: 'sms',
        code: otp,
      });
      if (!response) {
        setValid(false);
        setStatus(false);
        return;
      }
      let updateUser;
      if (typeof window !== 'undefined') {
        updateUser = localStorage.getItem('update-user');
        updateUser = JSON.parse(updateUser);
      }
      setStatus(true);
      const res = await api.profile.updateIndividualUser(updateUser);
      if (res.data?.status === 'SUCCESSFUL') {
        updateStep(step + 1);
        updatePwdState(true);
        localStorage.removeItem('update-user');
        setStatus(false);
      } else {
        if (!NETWORK_STATUS_CODES.includes(res.code)) {
          setStatus(false);
          toast.error('Failed user data update', { duration: 8000 });
        }
      }
    }
  };
  const maskedMobile = userMobile.slice(userMobile.length - 3);
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
      <div className='whitespace-pre-wrap text-[#6F7482] text-base font-medium mx-auto max-w-7xl w-80 md:w-96'>
        {otpMgs}
        {userMobile ? Array(userMobile.length - 3).join('*') + maskedMobile : ''}
        <OTPInput
          autoFocus
          disabled={isDisabled}
          length={6}
          className='m-3'
          inputClassName={`w-10 h-12 mr-2 md:mr-4 mb-4 md:mb-0 text-lg text-center rounded border border-solid ${
            isValid || isResend ? 'border-[#003E5C]' : 'border-[#EA0000]'
          } bg-[#F2F8FB]`}
          onChangeOTP={(otp) => onChange(otp)}
        />
        {isValid || isResend ? null : (
          <div className='pl-2 md:pl-3 text-[#EA0000] text-xs font-normal order-2 self-stretch'>Please enter valid OTP.</div>
        )}
        <div className='text-[#6F7482] text-base font-medium'>
          <Timer setDisable={updateState} setResend={updateResend} userId={userId} type={'sms'} action={'profile_update'} />
        </div>
      </div>
    </>
  );
};

export default OTP;
