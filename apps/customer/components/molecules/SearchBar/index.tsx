/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 25 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { SearchIcon, ArrowCircleRightIcon } from '@mtcloud/ui/atoms/icons';
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';
import React, { MutableRefObject, useEffect } from 'react';

const SearchBar = ({
  searchData,
  width,
  visibility,
  name,
  formikRef,
}: {
  // eslint-disable-next-line no-unused-vars
  searchData: (x) => void;
  width: string;
  visibility?: string;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formikRef?: MutableRefObject<any>;
}) => {
  const { asPath, query } = useRouter();
  useEffect(() => {
    if (formikRef !== undefined && name === 'searchKey' && formikRef.current) {
      formikRef.current.focus();
    }
  }, [formikRef]);

  return (
    <Formik
      initialValues={{
        searchKey: asPath.includes('/searchResults') ? query.searchKey : '',
      }}
      onSubmit={(values) => {
        console.log(values);
        searchData(values);
      }}
    >
      {({ handleSubmit, dirty, initialValues }) => (
        <Form className={`flex ${visibility}`} onSubmit={handleSubmit}>
          <div className='relative'>
            <Field
              className={`border-2 border-gray-300 bg-white pl-8 h-8 rounded-2xl text-sm focus:outline-none ${width}`}
              type='search'
              name={'searchKey'}
              innerRef={formikRef}
              placeholder='search'
            />
            <SearchIcon className='absolute left-0 top-0 mt-2 ml-3 mr-3 w-4 h-4 text-[#F89711] focus-visible:ring-2 focus-visible:ring-mtBlueAlt focus-visible:ring-opacity-75' />
            <button
              type='submit'
              disabled={initialValues.searchKey !== '' ? false : !dirty}
              className='absolute right-0 top-0 w-8 h-8 bg-skyBlue rounded-r-full grid place-items-center'
            >
              <ArrowCircleRightIcon className='w-5 h-5 text-white focus-visible:ring-2 focus-visible:ring-mtBlueAlt focus-visible:ring-opacity-75' />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;
