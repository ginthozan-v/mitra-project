/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 23 March 2022 3:30 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import api from '../../../../../apps/customer/api';
import toast from 'react-hot-toast';

const Timer = (
  {
    setDisable,
    userId,
    type,
    action,
    eventName = '',
    setResend,
  }: {
    setDisable: (val: boolean) => void;
    userId: string;
    type: string;
    action?: string;
    eventName?: string;
    setResend: (val: boolean) => void;
  },
  props: any,
) => {
  const { initialMinute = 2, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isZero, setZero] = useState(false);
  const [disabled, setButtonDisable] = useState(false);

  const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);

  const onResend = async () => {
    setButtonDisable(true);
    const data = { userId: userId.toString(), type: type, action: action };

    let response;
    if (eventName === 'POSTPAID_PURCHASE') {
      response = await api.otp.sendOTP({ action: 'CHECKOUT', type: 'SMS_EMAIL' });
    } else {
      response = await api.register.otpResend(data);
    }

    if (response) {
      setMinutes(2);
      setSeconds(0);
      setZero(false);
      setDisable(false);
      setButtonDisable(false);
      setResend(true);
    } else {
      setButtonDisable(false);
      setResend(false);
      toast.error('OTP resending failed', { duration: 8000 });
    }
  };

  const timerVal = () => {
    intervalRef.current = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(intervalRef.current as NodeJS.Timeout);
          setZero(true);
          setDisable(true);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
  };
  useEffect(() => {
    timerVal();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }
    };
  });

  if (isZero) {
    return (
      <span>
        Did not receive the verification code?{' '}
        <button id='otpBtn' className='text-base font-medium text-[#003E5C] h-12' onClick={onResend} disabled={disabled}>
          Resend
        </button>
      </span>
    );
  }

  return (
    <div>
      Verification code expires in
      <span className='text-[#EA0000] text-base font-medium px-1'>
        {'0'}
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </span>
    </div>
  );
};

export default Timer;
