/*
 * File: 500.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 15 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';

const ServerError = () => {
  return (
    <>
      <SEO title="ServerError" desc="ServerError Description" />
      <div>This is ServerError page</div>
    </>
  );
};

export default ServerError;

ServerError.Layout = MainLayout;
