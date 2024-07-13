/*
 * File: dashboard.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 20 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import { ROUTE_BILLING } from 'constants/routes';
import MobileProductSelect from 'components/molecules/MobileSelect';
import Sidebar from 'components/molecules/Sidebar';
import menuItems from 'constants/billing/menuItems';
import { useEffect, useState } from 'react';
import api from 'api';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import AuthGuard from 'components/utils/AuthGuard';
import { NETWORK_STATUS_CODES } from '@/constants';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setStatus] = useState(true);
  const { locale } = useRouter();

  useEffect(() => {
    setStatus(true);
    getData();
  }, [locale]);

  const getData = async () => {
    try {
      const res = await api.billing.getDashboardResources();
      if (typeof res !== 'string') {
        setData(res.data.currentResources);
      } else {
        if (!NETWORK_STATUS_CODES.includes(res)) {
          toast.error('Something went wrong', { duration: 8000 });
        }
      }

      setStatus(false);
    } catch (error) {
      setData([]);
      setStatus(false);
      toast.error('Something went wrong');
    }
  };
  return (
    <>
      <SEO title='Dashboard' desc='Dashboard Description' />
      <ItemDescription title='Billing Center' type='TitleBannerSlim' image='/bgsample-mt.jpg' />
      <MobileProductSelect list={menuItems} select={menuItems[0]} />
      <div className='max-w-7xl mx-auto p-4 flex'>
        <Sidebar selected={ROUTE_BILLING} menuItems={menuItems} />

        <div className='grow ml-6 pt-8 overflow-x-auto overflow-y-hidden'>
          <h3 className='py-2 text-xl font-semibold'>My Resources </h3>
          {(data.length !== 0 || data.length !== undefined) && (
            <div className='flex flex-wrap '>
              {data?.map(({ code, displayText, count }) => (
                <div className='p-2 w-full md:w-1/4 xl:w-1/3' key={code}>
                  <div className='bg-white hover:bg-mtBlue/10 shadow rounded-md p-3 block'>
                    <div className='flex justify-center items-center'>
                      <h4 className='font-semibold text-gray-800'>No. of purchased {displayText}</h4>
                    </div>
                    <p className='line-clamp-3 text-sm text-center text-gray-500 mt-2'>{count}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Dashboard.Layout = MainLayout;

export default AuthGuard(Dashboard);
