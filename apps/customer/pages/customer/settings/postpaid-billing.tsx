/*
 * File: postpaid-billing.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Tuesday, 03 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import { ROUTE_SETTINGS_POSTPAID } from 'constants/routes';
import Postpaid from 'components/molecules/settings/Postpaid';
import MobileProductSelect from 'components/molecules/MobileSelect';
import Sidebar from 'components/molecules/Sidebar';
import menuItems from 'constants/settings/menuItems';
import AuthGuard from 'components/utils/AuthGuard';
import { getAuth } from 'utils/auth';
import { useEffect, useState } from 'react';
import api from 'api';
import useStore from 'store';
import { POSTPAID_STATUS } from '@/models';

const PostpaidBilling = () => {
  const status = useStore((state) => state.status);
  const [state, setState] = useState({
    postPaidBillingStatus: '',
    label: '',
    message: '',
  });
  const auth = getAuth();

  useEffect(() => {
    if (auth && auth.userid) {
      const getPostpaidSettings = async () => {
        const res = await api.user.settings.getPostpaidSettings();
        const data = {
          postPaidBillingStatus: res.postPaidBillingStatus,
          label: '',
          message: res.verificationMessage,
        };

        if (data.postPaidBillingStatus === POSTPAID_STATUS.PENDING) {
          data.label = 'Your request will be reviewed by our agents within 2 working days.';
        } else if (data.postPaidBillingStatus === POSTPAID_STATUS.REJECTED) {
          data.label = 'You may send verification request again, your request will be reviewed by our agents within 2 working days.';
        }
        setState(data);
      };
      getPostpaidSettings().catch((error) => {
        console.error(error);
      });
    }
  }, []);

  return (
    <>
      <SEO title='Postpaid-billing' desc='Postpaid-billing Description' />
      <ItemDescription title='Settings' type='TitleBannerSlim' image='/bgsample-mt.jpg' />
      <MobileProductSelect list={menuItems} select={menuItems[2]} />
      <div className='max-w-7xl mx-auto p-4 flex'>
        <Sidebar selected={ROUTE_SETTINGS_POSTPAID} menuItems={menuItems} />
        <div className='flex flex-col grow pt-8 overflow-x-auto overflow-y-hidden'>
          <div className='settings-box'>
            {status === 'ACTIVE' ? (
              <Postpaid status={state.postPaidBillingStatus} label={state.label} message={state.message} />
            ) : status === 'REJECTED' || status === 'INTERMEDIATE' || status === 'CREATIO_FAILED' ? (
              <div>Sorry, you are not allowed to request for postpaid billing since your account has not been activated yet.</div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

PostpaidBilling.Layout = MainLayout;

export default AuthGuard(PostpaidBilling);
