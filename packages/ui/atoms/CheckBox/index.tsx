/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 16 March 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { Field } from 'formik';

const CheckBox = ({ name, label }: { name: string; label?: string }) => {
  return (
    <div className='flex items-center gap-2'>
      <Field
        name={name}
        type='checkbox'
        value={label}
        className='w-4 h-4 accent-[#00AEEF] hover:accent-[#FFA400]'
      />
      <p className='text-sm leading-none'>{label}</p>
    </div>
  );
};

export default CheckBox;
