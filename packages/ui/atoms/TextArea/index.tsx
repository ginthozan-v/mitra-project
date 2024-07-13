/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 16 March 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import React from 'react';
import { Field } from 'formik';

const TextArea = ({ type, name, errors, touched, placeholder }: any) => {
  let borderColor = 'border-[#003e5c]';
  if (name && errors && touched) {
    borderColor = 'border-[#EA0000]';
  }
  return (
    <div>
      <Field
        className={`form-control appearance-none static w-full bg-[#f2f8fb] border border-solid ${borderColor} box-border rounded self-stretch font-normal text-sm text-[#535353] leading-tight focus:outline-none focus:bg-white`}
        type={type}
        name={name}
        as="textarea"
        rows={6}
        placeholder={placeholder}
      ></Field>
    </div>
  );
};

export default TextArea;
