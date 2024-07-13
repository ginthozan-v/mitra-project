/**
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: 22 October 2022, 13:28
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import React, { KeyboardEventHandler, useEffect, MouseEventHandler } from 'react';
import CreatableSelect from 'react-select/creatable';

const components = {
  DropdownIndicator: null,
};

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: '#f2f8fb',
    border: 0,
    boxShadow: 'none',
    // height: '10px',
    padding: '0px',
  }),

  menu: (base: any) => ({
    ...base,
    zIndex: 100,
  }),
};
const CustomInput = ({
  field,
  fieldName,
  updateValue,
  form,
  options,
  onChange,
  keyState,
  onCreateOption,
}: {
  field: any;
  fieldName: string;
  updateValue: (x: any) => void;
  form: any;
  keyState: boolean;
  options: readonly Option[];
  onChange: any;
  onCreateOption?: (x: boolean) => void;
}) => {
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState<readonly Option[]>(options);

  let borderColor = 'border-[#003e5c]';

  if (!keyState && form.touched[field.name]) {
    borderColor = 'border-[#EA0000]';
  }
  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) {
      return;
    }
    switch (event.key) {
      case 'Enter':
      case ',':
      case 'Tab':
        const isValid = !validateEmail(inputValue);
        if (isValid) {
          setValue((prev) => [...prev, createOption(inputValue)]);
          updateValue([...value, createOption(inputValue)]);
          setInputValue('');
        }
        if (typeof onCreateOption === 'function') {
          onCreateOption(isValid);
        }

        event.preventDefault();
    }
  };

  const handleMouseClick: MouseEventHandler = (event) => {
    if (event.button) {
      if (typeof onCreateOption === 'function') {
        onCreateOption(true);
      }
      console.log('hi');
      updateValue(value);
    }
  };

  const validateEmail = (email: string) => {
    let errors = false;
    if (
      email &&
      !/^(([^<>()[\]\\.,;:-\s@\\"]+(\.[^<>()[\]\\.,;:-\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        email,
      )
    ) {
      errors = true;
    }
    return errors;
  };

  return (
    <CreatableSelect
      className={`w-96 appearance-none static border border-solid my-1.5 ${borderColor} box-border rounded selector`}
      styles={colourStyles}
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => {
        setValue(newValue);
        onChange && onChange(newValue);
        if (!inputValue) {
          if (typeof onCreateOption === 'function') {
            onCreateOption(true);
          }
          updateValue(newValue);
        }
      }}
      onInputChange={(newValue) => {
        setInputValue(newValue);
        form.setFieldValue(field.name, newValue);
        form.setFieldTouched(field.name, true);
      }}
      onKeyDown={handleKeyDown}
      placeholder='Type something and press enter...'
      value={value}
    />
  );
};

export default CustomInput;
