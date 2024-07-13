/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 21 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import Select from 'react-select';
const options = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
];
export default function RowsSelector({
  updatePageLimit,
}: {
  // eslint-disable-next-line no-unused-vars
  updatePageLimit: (num: number) => void;
}) {
  return (
    <Select
      menuPlacement='auto'
      instanceId='row-selector'
      options={options}
      defaultValue={options[0]}
      onChange={(option) => updatePageLimit(option.value)}
      className='focus:ring-mtBlue/75 focus:border-mtBlue/75 border-mtBlue/25 rounded-md py-1 pagination-selector'
    />
  );
}
