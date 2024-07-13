/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 16 March 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { ErrorMessage } from 'formik';

const ErrorMgs = ({ name }: { name: string }) => {
  return (
    <ErrorMessage
      className={`text-[#EA0000] text-xs font-normal order-2 self-stretch`}
      name={name}
      component='div'
    />
  );
};

export default ErrorMgs;
