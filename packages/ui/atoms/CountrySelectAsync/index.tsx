/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: Tuesday, 05 April 2022 04:20 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { Field } from 'formik';
import SelectField from './SelectField';

interface propTypes {
  name: string;
  errors: any;
}

const CountrySelectAsync = ({ name, errors }: propTypes) => {
  let borderColor = 'border-[#003e5c]';
  if (errors[name]) {
    borderColor = 'border-[#EA0000]';
  }

  return <Field name={name} component={SelectField} />;
};

export default CountrySelectAsync;
