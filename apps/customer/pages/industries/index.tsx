/*
 * File: industires.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 3 May 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useRouter } from 'next/router';
import useStore from '@/store';
import { ROUTE_INDUSTRIES } from '@/constants/routes';
import { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';

const Industries = () => {
  const industries = useStore((store) => store.industries);
  const { replace } = useRouter();

  useEffect(() => {
    if (industries.length > 0) {
      replace(`${ROUTE_INDUSTRIES}/${industries[0].solutionKey}`);
    }
  }, [industries]);
  return null;
};

Industries.Layout = MainLayout;

export default Industries;
