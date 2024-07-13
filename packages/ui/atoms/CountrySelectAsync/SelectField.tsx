/*
 * File: SelectField.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: Friday, 8 April 2022 10:50 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import Image from 'next/image';
import api from '../../../../apps/admin/api';

const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    background: '#f2f8fb',

    border: 0,
    boxShadow: 'none',
  }),

  menu: (base: any) => ({
    ...base,
    zIndex: 100,
  }),
};

let borderColor = 'border-[#003e5c]';

const SelectField = ({ field, form }: any) => {
  const [value, onChange] = useState<any | null>({
    value: 'Mauritius',
    label: 'Mauritius 2',
    flag: 'https://flagcdn.com/mu.svg',
  });
  const [options, setOptions] = useState<any[]>([]);

  const handleChange = (option: any) => {
    form.setFieldValue(field.name, option.value);
    onChange(option);

    if (form.values.hasOwnProperty('countryCode')) {
      form.setFieldValue('countryCode', option.countryCode);
    }

    if (form.values.hasOwnProperty('additionalCountryCode')) {
      form.setFieldValue('additionalCountryCode', option.countryCode);
    }
  };

  async function loadOptions(search: string, loadedOptions: any, { page }: any) {
    const response = await api.country.getAll(page, 250, 'nameEn', 'asc', true);

    let array: any[] = [];
    if (response) {
      if (search) {
        const searchLower = search.toLowerCase();
        response.content
          .filter((x: any) => x.name.en.toLowerCase().includes(searchLower))
          .map((data: any) =>
            array.push({
              value: data.name.en,
              label: data.name.en,
              countryCode: data.countryCode,
              flag: data.flag,
            }),
          );
      } else {
        response.content.map((data: any) =>
          array.push({
            value: data.name.en,
            label: data.name.en,
            countryCode: data.countryCode,
            flag: data.flag,
          }),
        );
      }
    }

    if (value) {
      array = array.filter((x) => x.value !== value.value);
    }
    setOptions([...options, ...array]);

    return {
      options: array,
      hasMore: response.resultsCount,
      additional: {
        page: page + 1,
      },
    };
  }

  useEffect(() => {
    if (!field?.value) {
      onChange({ value: 'Mauritius', label: 'Mauritius', flag: 'https://flagcdn.com/mu.svg' });
      form.setFieldValue(field.name, 'Mauritius');
    }
  }, [field?.value]);

  useEffect(() => {
    form.setFieldValue(field.name, 'Mauritius');
  }, []);

  return (
    <>
      <AsyncPaginate
        className={`appearance-none static  border border-solid ${borderColor} box-border rounded my-1.5`}
        menuPlacement='auto'
        defaultOptions={true}
        styles={colourStyles}
        name={field.name}
        value={value}
        loadOptions={loadOptions}
        onChange={(option) => {
          handleChange(option);
        }}
        additional={{
          page: 0,
        }}
        onBlur={field.onBlur}
        id={field.name}
        instanceId={field.name}
        formatOptionLabel={(item) => (
          <div className='flex items-center gap-2'>
            {item?.flag && (
              <div className='relative object-cover w-10 bg-gray-100 border h-7'>
                <Image src={item.flag} layout='fill' />
              </div>
            )}
            <div>{item.label}</div>
          </div>
        )}
      />
    </>
  );
};

export default SelectField;
