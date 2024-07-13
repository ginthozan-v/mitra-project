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
    value: '+230',
    label: '+230',
    flag: 'https://flagcdn.com/mu.svg',
  });
  const [options, setOptions] = useState<any[]>([]);

  const handleChange = async (option: string) => {
    await form.setFieldValue(field.name, option);
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
              value: data.countryCode,
              label: data.countryCode,
              flag: data.flag,
            }),
          );
      } else {
        response.content.map((data: any) =>
          array.push({
            value: data.countryCode,
            label: data.countryCode,
            flag: data.flag,
          }),
        );
      }
    }

    setOptions([...options, ...array]);

    return {
      options: array,
      hasMore: response.content.length,
      additional: {
        page: page + 1,
      },
    };
  }

  useEffect(() => {
    if (!field?.value) {
      onChange({ value: '+230', label: '+230', flag: 'https://flagcdn.com/mu.svg' });
      form.setFieldValue(field.name, '+230');
    }
  }, [field?.value]);

  useEffect(() => {
    if (field.value) {
      const option = options?.filter((x) => x.value.toString() === field?.value.toString());
      onChange(option[0]);
    }
  }, [options, field?.value]);

  return (
    <>
      <AsyncPaginate
        className={`appearance-none p-0 static border border-solid my-1.5 ${borderColor} box-border rounded selector`}
        defaultOptions={true}
        styles={colourStyles}
        name={field.name}
        value={value}
        loadOptions={loadOptions}
        onChange={(option) => {
          handleChange(option.value);
          onChange(option);
        }}
        additional={{
          page: 0,
        }}
        onBlur={field.onBlur}
        id={field.name}
        instanceId={field.name}
        formatOptionLabel={(item) => (
          <div className='flex items-center gap-x-2'>
            {item?.flag && (
              <div className='relative object-cover h-6 bg-gray-100 border w-9'>
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
