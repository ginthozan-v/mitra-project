/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 16 March 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

const Label = ({ name, errors, touched, isValidating, children }: any) => {
  let textColor = 'text-[#535353]';

  if (
    (name !== 'password' && errors && touched) ||
    (name === 'password' && typeof errors !== 'undefined' && errors.length !== 0 && touched) ||
    (name === 'email' && errors && touched && !isValidating)
  ) {
    textColor = 'text-[#EA0000]';
  }
  return (
    <div>
      <label className={`font-normal tracking-wide self-stretch ${textColor} text-sm my-1`}>
        {children}
      </label>
    </div>
  );
};

export default Label;
