/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Friday, 18 March 2022 08:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { Field } from 'formik';
import SelectField from '../Selector';

type countryOptions = { value: string; label: string; flag: string }[];

const CountrySelect = ({ name, options }: { name: string; options: countryOptions }) => {
  return <Field name={name} component={SelectField} options={options} />;
};

export default CountrySelect;
