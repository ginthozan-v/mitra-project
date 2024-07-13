/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 22 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import type { PropsStepper } from '@mtcloud/globals/types';
import OTPInput from '@mtcloud/ui/atoms/OTPField';
import Timer from '@mtcloud/ui/atoms/OTPField/Timer';
import api from 'api';
import { useState } from 'react';
import toast from 'react-hot-toast';

const OTP = ({ step, updateStep, userEmail, userMobile, userId, isMobile = false }: { isMobile?: boolean } & PropsStepper) => {
  const [isDisabled, setDisable] = useState(false);
  const [isResend, setResend] = useState(false);
  const [isValid, setValid] = useState(true);

  const otpMgs = `Please enter the verification code you received
on `;

  if (typeof window !== 'undefined') {
    localStorage.setItem('step', step.toString());
  }
  const updateState = (newState: boolean) => {
    setDisable(newState);
  };

  const updateResend = (newState: boolean) => {
    setResend(newState);
    setValid(true);
  };

  const onChange = async (otp: string) => {
    let type = '';
    {
      isMobile ? (type = 'sms') : (type = 'email');
    }

    if (otp.length === 6) {
      setResend(false);
      const response = await api.register.verifyOTP({
        userId: userId,
        type: type,
        code: otp,
      });
      if (!response) {
        setValid(false);
        return;
      } else if (type === 'email') {
        const otpPayload = {
          action: 'REGISTER',
          type: 'SMS',
          userId: userId.toString(),
        };
        const res = await api.register.otpInit(otpPayload);
        if (res) {
          updateStep(step + 1);
        } else {
          toast.error('SMS OTP sending failed', { duration: 8000 });
        }
      }
      updateStep(step + 1);
    }
  };
  let maskedMobile = '';
  let maskedEmail = [];

  if (isMobile) {
    maskedMobile = userMobile.slice(userMobile.length - 3);
  } else {
    maskedEmail = userEmail.split('@');
  }

  return (
    <div className='whitespace-pre-wrap text-[#6F7482] text-base font-medium m-3 w-80 md:w-fit'>
      {otpMgs}
      {isMobile && userMobile
        ? Array(userMobile.length - 3).join('*') + maskedMobile
        : Array(maskedEmail[0].length + 1).join('*') + '@' + maskedEmail[1]}

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
        <Timer setDisable={updateState} setResend={updateResend} userId={userId} type={isMobile ? 'sms' : 'email'} action={'register_otp'} />
      </div>
    </div>
  );
};

export default OTP;
