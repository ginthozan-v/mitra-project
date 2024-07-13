/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: Wednesday, 11 May 2022 12:41 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { Field } from 'formik';

const ToggleSwitch = ({ name }: { name: string }) => {
  return (
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <Field
        name={name}
        type="checkbox"
        id={name}
        className="toggle-checkbox absolute block w-6 h-6 rounded-full 
    bg-white border-4 appearance-none cursor-pointer"
      />
      <label
        htmlFor={name}
        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
      ></label>
    </div>
  );
};

export default ToggleSwitch;
