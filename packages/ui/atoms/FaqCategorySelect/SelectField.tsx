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
  const [options, setOptions] = useState<any[]>([]);

  const handleChange = (option: string) => {
    form.setFieldValue(field.name, option);
  };

  async function loadOptions(search: string, loadedOptions: any, { page }: any) {
    const response = await api.faq_category.getAll(page, 10);
    let array: any[] = [];
    if (response) {
      response.content.map((data: any) =>
        array.push({
          value: data.id,
          label: data.title.en,
        }),
      );
    }
    if (value) {
      array = array.filter((x) => x.value !== value.value);
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
    if (field?.value[0]) {
      onChange({ value: field.value[0].value, label: field.value[0].label });
      form.setFieldValue(field.name, field.value[0].value);
    }
  }, [field?.value]);

  useEffect(() => {
    if (!field.value) {
      onChange(null);
    }
  }, [field?.value]);

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
