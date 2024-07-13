/*
 * File: privacy.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 24 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';

const Privacy = () => {
  return (
    <>
      <SEO title="Privacy" desc="Privacy Description" />
      <div>This is Privacy page</div>
    </>
  );
};

export default Privacy;

Privacy.Layout = MainLayout;
