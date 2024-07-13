/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 23 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { SearchIcon } from '@mtcloud/ui/atoms/icons';
import { SearchData } from '@mtcloud/utils/validation/types';
import SearchBar from 'components/molecules/SearchBar';
import { ROUTE_SEARCH } from 'constants/routes';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import useStore from 'store';

const Search = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const { search } = useStore((state) => ({
    search: state.search,
    setSearch: state.setSearch,
  }));

  const formikRef = useRef(null);

  const searchData = (data: SearchData) => {
    router.push(`${ROUTE_SEARCH}${data.searchKey}`);
    setStep(0);
  };

  if (step === 1) {
    return (
      <SearchBar
        searchData={searchData}
        width='md:w-80 w-52'
        name='searchKey'
        formikRef={formikRef}
      />
    );
  }

  return (
    <button
      className='w-7 h-7 bg-white rounded-full grid place-items-center mr-3 border border-mtBlue/50'
      onClick={() => {
        setStep(1);
      }}
      disabled={search}
    >
      <SearchIcon className='w-3 h-3 text-mtBlue focus-visible:ring-2 focus-visible:ring-mtBlueAlt focus-visible:ring-opacity-75' />
    </button>
  );
};

export default Search;
