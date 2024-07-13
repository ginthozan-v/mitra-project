/*
 * File: point-history.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 25 May 2022 03:52 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useState } from 'react';

import MainLayout from 'components/layouts/MainLayout';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import Sidebar from 'components/molecules/Sidebar';
import SEO from 'components/utils/SEO';
import menuItems from 'constants/loyalty/menuItems';
import MobileProductSelect from 'components/molecules/MobileSelect';
import { ROUTE_LOYALTY_POINT_HISTORY } from 'constants/routes';
import SampleTable from 'components/molecules/customer/billing/SampleTable';
import EarnPointCard from 'components/organisms/Loyalty/EarnPointsCard';

const PointHistory = () => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  const onActionClick = () => {
    setIsOpen(true);
  };
  return (
    <>
      <SEO title='Loyalty' desc='Loyalty Description' />
      <ItemDescription title='Loyalty' type='TitleBannerSlim' image='/bgsample-mt.jpg' />
      <MobileProductSelect list={menuItems} select={menuItems[0]} />
      <div className='max-w-7xl mx-auto p-4 flex'>
        <Sidebar selected={ROUTE_LOYALTY_POINT_HISTORY} menuItems={menuItems} />
        <div className='grow overflow-hidden p-1 py-4'>
          <div className='flex items-center justify-between mb-4 text-4xl text-[#474747]'>
            <h1>Total Points</h1>
            <h2>254</h2>
          </div>
          <SampleTable onActionClick={onActionClick} isAction data={[]} />
          <EarnPointCard />
        </div>
      </div>
    </>
  );
};

export default PointHistory;
PointHistory.Layout = MainLayout;
