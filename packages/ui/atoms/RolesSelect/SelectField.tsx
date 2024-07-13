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
import api from '../../../../apps/admin/api';

const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    background: '#f2f8fb',
    height: '40px',
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
  const [value, onChange] = useState<any | null>(null);

  const handleChange = (option: string) => {
    form.setFieldValue(field.name, option);
  };

  async function loadOptions(search: string, loadedOptions: any, { page }: any) {
    const response = await api.roles.getAll(page, 10, 'none', 'true');

    let array: any[] = [];

    if (response.roles) {
      if (!search) {
        response.roles.map((data: any) =>
          array.push({
            value: data.id,
            label: data.title,
          }),
        );
      } else {
        const searchLower = search.toLowerCase();
        response.roles
          .filter((x: any) => x.title.toLowerCase().includes(searchLower))
          .map((data: any) =>
            array.push({
              value: data.id,
              label: data.title,
            }),
          );
      }
    }
    if (value) {
      array = array.filter((x) => x.value !== value.value);
    }

    return {
      options: array,
      hasMore: response.resultCount,
      additional: {
        page: page + 1,
      },
    };
  }

  useEffect(() => {
    if (field?.value[0]?.value) {
      onChange({ value: field.value[0].value, label: field.value[0].label });
      form.setFieldValue(field.name, field.value[0].value);
    }
  }, [field?.value]);

  useEffect(() => {
    if (field.value.length === 0) {
      onChange(null);
    }
  }, [field.value]);

  return (
    <>
      <AsyncPaginate
        className={`appearance-none static border border-solid ${borderColor} box-border rounded`}
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
      />
    </>
  );
};

export default SelectField;
