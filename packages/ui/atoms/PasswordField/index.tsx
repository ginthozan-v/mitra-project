/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 21 March 2022 10:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import React, { useState } from 'react';
import TextField from '@mtcloud/ui/atoms/TextInput';
import { Field } from 'formik';
import EyeCrossedIcon from '../icons/EyeCrossedIcon';
import EyeIcon from '../icons/EyeIcon';

const PasswordField = ({ name, errors, touched }: any) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <div className="absolute w-10 right-0 top-0 bottom-0 grid place-items-center">
        <button onClick={() => setShow(!show)} type="button">
          {show ? (
            <EyeIcon className="w-6 h-6 text-[#00aeef]" />
          ) : (
            <EyeCrossedIcon className="w-6 h-6 text-[#00aeef]" />
          )}
        </button>
      </div>
      <TextField
        name={name}
        type={show ? 'text' : 'password'}
        errors={errors}
        touched={touched}
      />
    </div>
  );
};

export default PasswordField;
