/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Thursday, 24 March 2022 8:30 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import React, { memo, useRef, useEffect } from 'react';
import usePrevious from '../../../../../apps/customer/components/hooks/useOtpPrv';

export interface SingleOTPInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
}

export function SingleOTPInputComponent(props: SingleOTPInputProps) {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);
  useEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return <input ref={inputRef} {...rest} id='pwd' />;
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
