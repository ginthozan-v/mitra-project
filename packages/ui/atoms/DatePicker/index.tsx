/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 05 April 2022 10:24 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import moment from 'moment';

const DatePicker = ({ name, value, onChange }: { name: string; value: string; onChange?: any }) => {
  value = moment(value).format('YYYY-MM-DD');
  return (
    <div className='flex items-center gap-2'>
      <label htmlFor={name} className='capitalize'>
        {name}
      </label>
      <input
        type='date'
        name={name}
        id={name}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className={`form-control appearance-none static w-full h-10 bg-[#f2f8fb] border border-solid box-border rounded self-stretch p-3 font-normal text-sm items-center text-[#535353] leading-tight focus:outline-none focus:bg-white`}
      />
    </div>
  );
};

export default DatePicker;
