/**
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: 16 August 2022, 18:08
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { PropsReactChildren } from '@mtcloud/globals/types';
import api from 'api';

const CountryContext = createContext([]);

export function CountryProvider({ children }: PropsReactChildren) {
  const { locale } = useRouter();
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.register.getCountryList(locale);

        res.map(({ id, countryCode, flag, countryName }) => ({
          id,
          countryCode,
          flag,
          countryName,
        }));
        setCountryList(res);
      } catch (error) {
        setCountryList([]);
      }
    };
    getData();
  }, [locale]);

  return <CountryContext.Provider value={countryList}>{children}</CountryContext.Provider>;
}

export default function useCountry() {
  const countries = useContext(CountryContext);
  return countries;
}
