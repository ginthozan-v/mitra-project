/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 16 March 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { Field } from 'formik';

const RadioButton = ({
  name,
  value,
  checked,
  disabled,
  onClick,
  className,
}: {
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (e: any) => void;
}) => {
  return (
    <div>
      <Field component="div">
        <input
          name={name}
          type={'radio'}
          value={value}
          defaultChecked={checked}
          disabled={disabled ? true : false}
          className={`w-4 h-4 ${className}`}
          onClick={onClick}
        />
      </Field>
    </div>
  );
};

export default RadioButton;
