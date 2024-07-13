/*
 * File: general.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Tuesday, 03 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import LangSwitch from 'components/molecules/LangSwitch';
import CurrencySwitch from 'components/molecules/CurrencySwitch';
import Sidebar from 'components/molecules/Sidebar';
import { ROUTE_SETTINGS } from 'constants/routes';
import MobileProductSelect from 'components/molecules/MobileSelect';
import menuItems from 'constants/settings/menuItems';
import AuthGuard from 'components/utils/AuthGuard';

const SettingsGeneral = () => {
  return (
    <>
      <SEO title='General' desc='General Description' />
      <ItemDescription
        title="Settings"
        type="TitleBannerSlim"
        image="/bgsample-mt.jpg"
      />
      <MobileProductSelect list={menuItems} select={menuItems[0]} />
      <div className='max-w-7xl mx-auto p-4 flex'>
        <Sidebar selected={ROUTE_SETTINGS} menuItems={menuItems} />
        <div className='flex flex-col grow pt-8'>
          <div className='settings-box'>
            <span>Language Selection</span>
            <div className='flex justify-center w-[200px] h-12 border rounded border-mtgreen'>
              <LangSwitch isMobile={false} dropdown={true} />
            </div>
          </div>
          <div className='settings-box'>
            <span>Currency Selection</span>
            <div className='flex justify-center w-[200px] h-12 border rounded border-mtgreen'>
              <CurrencySwitch isMobile={false} dropdown={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SettingsGeneral.Layout = MainLayout;

export default AuthGuard(SettingsGeneral);
