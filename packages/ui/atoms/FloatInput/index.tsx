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
  const regex = new RegExp(/(^\d*\.?$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight)/);
  if (!e.key.match(regex)) e.preventDefault();
}

const FloatInput = ({
  type,
  name,
  errors,
  touched,
  isValidating,
  disable,
  placeholder,
  component,
  options,
  setFieldValue,
}: any) => {
  let borderColor = 'border-[#003e5c]';

  const handleChange = (evt: any) => {
    const { value } = evt.target;

    // check if value includes a decimal point
    if (value.match(/\./g)) {
      const [, decimal] = value.split('.');

      // restrict value to only 2 decimal places
      if (decimal?.length > 2) {
        // do nothing
        return;
      }
    }

    // otherwise, update value in state
    setFieldValue(name, value);
  };

  return (
    <div>
      <Field
        className={`form-control appearance-none static w-full h-10 bg-[#f2f8fb] border border-solid ${borderColor} box-border rounded self-stretch p-3 my-1.5 font-normal text-sm items-center text-[#535353] leading-tight focus:outline-none focus:bg-white`}
        type={type}
        name={name}
        disabled={disable}
        component={component}
        options={options}
        placeholder={placeholder}
        onWheel={(e: any) => e.target.blur()}
        onKeyDown={(evt: any) => preventNonNumericalInput(evt)}
        onChange={(e: any) => handleChange(e)}
      />
    </div>
  );
};

export default FloatInput;
