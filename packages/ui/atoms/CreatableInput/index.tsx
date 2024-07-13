/**
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: 22 October 2022, 13:23
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { Field } from 'formik';
import { KeyboardEventHandler } from 'react';
import CustomInput from '../CustomInput';

interface Option {
  readonly label: string;
  readonly value: string;
}

const CreatableInput = ({
  keyState,
  name,
  options,
  updateValue,
  onCreateOption,
}: {
  name: string;
  options: Option[];
  keyState: boolean;
  updateValue: (x: Option) => void;
  onCreateOption?: (x: boolean) => void;
}) => {
  return (
    <Field
      name={name}
      component={CustomInput}
      options={options[0]}
      fieldName={name}
      updateValue={updateValue}
      onCreateOption={onCreateOption}
      keyState={keyState}
    />
  );
};

export default CreatableInput;
