/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monady, 04 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { Field } from 'formik';
import SelectField from '../Selector';

const options = [
  { value: '1', label: 'System Administrator or O&M Engineer' },
  { value: '2', label: 'System Architect' },
  { value: '3', label: 'Software Engineer' },
  { value: '4', label: 'Deputy Technical Director or IT Director' },
  { value: '5', label: 'Technical Director or IT Director' },
  { value: '6', label: 'CTO' },
  { value: '7', label: 'CEO' },
];

const DesignationSelect = ({ name }: { name: string }) => {
  return <Field name={name} component={SelectField} options={options} />;
};

export default DesignationSelect;
