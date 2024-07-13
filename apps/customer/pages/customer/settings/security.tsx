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
import { ROUTE_SETTINGS_SECURITY } from 'constants/routes';
import TwoFactorAuth from 'components/molecules/settings/TwoFactorAuth';
import ResetPassword from 'components/molecules/settings/ResetPassword';
import MobileProductSelect from 'components/molecules/MobileSelect';
import Sidebar from 'components/molecules/Sidebar';
import menuItems from 'constants/settings/menuItems';
import AuthGuard from 'components/utils/AuthGuard';
import { useEffect, useState } from 'react';
import { getAuth } from 'utils/auth';
import api from 'api';

const SettingsSecurity = () => {
  const [state, setState] = useState({
    enabled: false,
    method: '',
  });
  const [qrCode, setQrCode] = useState(null);
  const auth = getAuth();

  const getSecuritySettings = async () => {
    try {
      const res = await api.user.settings.getSecuritySettings();
      setState({
        enabled: res.preferredTFAMethod && res.preferredTFAMethod !== 'NONE' ? true : false,
        method: res.preferredTFAMethod,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth && auth.userid) {
      getSecuritySettings();
    }
  }, []);

  const change = async (preferredTFAMethod: string) => {
    if (auth && auth.userid) {
      await api.user.settings.saveSecuritySettings({ preferredTFAMethod });
      if (preferredTFAMethod === 'GOOGLE') {
        // const data = await api.user.settings.generateQrCode();
        // console.log('qr >>', data);
      }
      getSecuritySettings();
    }
  };

  return (
    <>
      <SEO title='Security' desc='Security Description' />
      <ItemDescription title='Settings' type='TitleBannerSlim' image='/bgsample-mt.jpg' />
      <MobileProductSelect list={menuItems} select={menuItems[1]} />
      <div className='flex p-4 mx-auto max-w-7xl'>
        <Sidebar selected={ROUTE_SETTINGS_SECURITY} menuItems={menuItems} />
        <div className='flex flex-col pt-8 overflow-x-auto overflow-y-hidden grow'>
          <div className='settings-box'>
            <TwoFactorAuth enabled={state.enabled} method={state.method} onChange={change} />
          </div>
          <div className='settings-box'>
            <ResetPassword />
          </div>
        </div>
      </div>
    </>
  );
};

SettingsSecurity.Layout = MainLayout;

export default AuthGuard(SettingsSecurity);
