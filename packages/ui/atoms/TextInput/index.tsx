/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 16 March 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { Field } from 'formik';

function preventNonNumericalInput(e: any) {
  const regex = new RegExp(/(^\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight)/);
  if (!e.key.match(regex)) e.preventDefault();
}

const TextField = ({ type, name, errors, touched, isValidating, disable, placeholder, component, options }: any) => {
  let borderColor = 'border-[#003e5c]';
  if (
    (name !== 'password' && errors && touched) ||
    (name === 'password' && typeof errors !== 'undefined' && errors.length !== 0 && touched) ||
    (name === 'email' && errors && touched && !isValidating)
  ) {
    borderColor = 'border-[#EA0000]';
  }

  return (
    <div>
      <Field
        className={`form-control appearance-none static w-full h-10 bg-[#f2f8fb] border border-solid ${borderColor} box-border 
        rounded self-stretch p-3 my-1.5 font-normal text-sm items-center text-[#535353] leading-tight focus:outline-none 
        focus:bg-white disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300`}
        type={type}
        name={name}
        disabled={disable}
        component={component}
        options={options}
        placeholder={placeholder}
        onWheel={(e: any) => e.target.blur()}
        onKeyDown={(evt: any) => name === 'priority' && preventNonNumericalInput(evt)}
      />
    </div>
  );
};

export default TextField;
