/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 02 June 2022 08:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { Field } from 'formik';
import SelectField from '../Selector';

type countryOptions = { value: string; label: string; flag: string }[];

const CountryCodeSelect = ({
  name,
  options,
  type,
}: {
  name: string;
  options: countryOptions;
  type?: string;
}) => {
  return <Field name={name} type={type} component={SelectField} options={options} />;
};

export default CountryCodeSelect;
