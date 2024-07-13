/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 15 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import listEn from 'translations/en.json';
import listFr from 'translations/fr.json';

import type { PropsReactChildren } from '@mtcloud/globals/types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const tr = (val: string): any => {};

const TranslationContext = createContext(tr);

export function TranslationProvider({ children }: PropsReactChildren) {
  const { locale } = useRouter();

  const translateFn = (property: string) => {
    if (!property) {
      return '';
    }
    const selectedList = locale === 'en' ? listEn : listFr;

    if (!(selectedList as any)[property]) {
      return '';
    }

    return (selectedList as any)[property];
  };

  return (
    <TranslationContext.Provider value={translateFn}>
      {children}
    </TranslationContext.Provider>
  );
}

export default function useTranslation() {
  const translationFn = useContext(TranslationContext);
  return translationFn;
}
