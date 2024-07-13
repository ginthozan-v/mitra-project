/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 15 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { createContext, useContext, useEffect, useState } from 'react';
import type { PropsReactChildren } from '@mtcloud/globals/types';
import { currencyList } from 'constants/global';
import api from 'api';
import { getAuth } from 'utils/auth';
import { useRouter } from 'next/router';
import useStore from '@/store';

const CurrencyContext = createContext(undefined);

export function CurrencyProvider({ children }: PropsReactChildren) {
  const [cur, setCur] = useState(currencyList.mur);
  const { locale } = useRouter();
  const auth = getAuth();
  // const setCurrencySwitchable = useStore((store) => store.setCurrencySwitchable);

  // useEffect(() => {
  //   let postpaid_checkout;
  //   if (typeof window !== 'undefined') {
  //     postpaid_checkout = localStorage.getItem('postpaid_checkout');
  //   }
  //   setCurrencySwitchable(!postpaid_checkout || postpaid_checkout !== '1');
  // }, []);

  const setCurrency = (c: keyof typeof currencyList) => {
    setCur(currencyList[c]);
  };

  const updateCurrency = (c: keyof typeof currencyList) => {
    if (auth && auth.userid) {
      api.user.settings
        .saveGeneralSettings({
          preferredCurrency: c,
          preferredLanguage: locale,
        })
        .then(() => {
          setCurrency(c);
        });
    } else {
      setCurrency(c);
    }
  };

  return <CurrencyContext.Provider value={{ ...cur, setCurrency, updateCurrency }}>{children}</CurrencyContext.Provider>;
}

export default function useCurrency(): {
  id: string;
  m: number;
  title: string;
  detail: string;
  symbol: string;
  setCurrency: (p: any) => void;
  updateCurrency: (p: any) => void;
} {
  const currencyConfig = useContext(CurrencyContext);
  return currencyConfig;
}
