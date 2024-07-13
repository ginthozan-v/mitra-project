/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: Tuesday, 12 May 2022 12:41 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { Field } from 'formik';
import SelectField from '../Selector';

interface propTypes {
  name: string;
  errors: any;
  options: [];
}

const Dropdown = ({ name, options, errors }: propTypes) => {
  return <Field name={name} component={SelectField} options={options} />;
};

export default Dropdown;
