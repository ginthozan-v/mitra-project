/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 16 March 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import Select from 'react-select';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: '#f2f8fb',
    border: 0,
    boxShadow: 'none',
    minHeight: '30px',
    height: '33px',
    padding: '0px',
    '@media only screen and (max-width: 640px)': {
      ...styles['@media only screen and (max-width: 640px)'],
      minHeight: '30px',
      height: '30px',
    },
  }),

  menu: (base: any) => ({
    ...base,
    zIndex: 100,
  }),
};

const SelectField = ({ options, field, form, onChange }: any) => {
  const [placeholder, setPlaceholder] = useState('Select....');
  let borderColor = 'border-[#003e5c]';

  if (form.errors[field.name] && form.touched[field.name]) {
    borderColor = 'border-[#EA0000]';
  }
  //add due to mobile isuue
  const handleBlur = () => {
    setTimeout(() => {
      form.setFieldTouched(field.name, true);
    }, 1);
  };

  useEffect(() => {
    if (field.value === '') {
      setPlaceholder('Select....');
    }
  }, [field.value]);

  return (
    <Select
      className={`appearance-none static border border-solid my-1.5 ${borderColor} box-border rounded selector`}
      styles={colourStyles}
      placeholder={placeholder}
      onFocus={() => setPlaceholder('')}
      options={options}
      name={field.name}
      isSearchable
      value={field.value ? options.find((option: { value: string }) => option.value === field.value) : ''}
      onChange={(option) => {
        form.setFieldValue(field.name, option.value);
        if (field.name === 'country') {
          form.setFieldValue('countryCode', option.code);
        }
        onChange && onChange(option);
      }}
      onBlur={(event) => handleBlur()}
      id={field.name}
      instanceId={field.name}
      formatOptionLabel={(item) => (
        <div className='flex items-center gap-2'>
          {item?.flag && (
            <div className='relative object-cover w-10 bg-gray-100 border md:h-7 h-6'>
              <Image src={item.flag} layout='fill' />
            </div>
          )}
          <div className='text-xs'>{item.label}</div>
        </div>
      )}
    />
  );
};

export default SelectField;
