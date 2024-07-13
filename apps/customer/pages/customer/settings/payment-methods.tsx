/*
 * File: payment-methods.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Tuesday, 03 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';

import { ROUTE_SETTINGS_PAYMENT } from 'constants/routes';
import Payment from 'components/molecules/settings/Payments';
import MobileProductSelect from 'components/molecules/MobileSelect';
import menuItems from 'constants/settings/menuItems';
import Sidebar from 'components/molecules/Sidebar';
import AuthGuard from 'components/utils/AuthGuard';

const PaymentMethod = () => {
  return (
    <>
      <SEO title='Postpaid-billing' desc='Postpaid-billing Description' />
      <ItemDescription
        title="Settings"
        type="TitleBannerSlim"
        image="/bgsample-mt.jpg"
      />
      <MobileProductSelect list={menuItems} select={menuItems[3]} />
      <div className='max-w-7xl mx-auto p-4 flex'>
        <Sidebar selected={ROUTE_SETTINGS_PAYMENT} menuItems={menuItems} />

        <div className='flex flex-col grow pt-8 overflow-x-auto overflow-y-hidden'>
          <div className="settings-box">
            <Payment />
          </div>
        </div>
      </div>
    </>
  );
};

PaymentMethod.Layout = MainLayout;

export default AuthGuard(PaymentMethod);
