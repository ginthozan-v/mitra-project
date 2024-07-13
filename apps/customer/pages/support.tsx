/*
 * File: support.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 23 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import useCurrency from 'components/hooks/useCurrency';
import useTranslation from 'components/hooks/useTranslation';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';

const Support = () => {
  const t = useTranslation();
  const { title: selectedCurrency, m } = useCurrency();
  return (
    <>
      <SEO title="Support" desc="Support Description" />
      <div>{t('test1')}</div>
      <div>{t('test2')}</div>
      <div>{t('test3')}</div>

      <div>{`selected currency is ${selectedCurrency}`}</div>
      <div>{`value of 1 equals to ${m} ${selectedCurrency}`}</div>
    </>
  );
};

export default Support;

Support.Layout = MainLayout;
