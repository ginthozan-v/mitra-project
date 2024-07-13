/*
 * File: dashboard.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 24 May 2022 02:56 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';

import MainLayout from 'components/layouts/MainLayout';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import Sidebar from 'components/molecules/Sidebar';
import SEO from 'components/utils/SEO';
import menuItems from 'constants/loyalty/menuItems';
import MobileProductSelect from 'components/molecules/MobileSelect';

import { ROUTE_LOYALTY } from 'constants/routes';
import { ChevronRightIcon } from '@mtcloud/ui/atoms/icons';
import SpecialOffersCard from 'components/organisms/Loyalty/SpecialOffersCard';
import EarnPointCard from 'components/organisms/Loyalty/EarnPointsCard';
import AchievedPointsCard from 'components/organisms/Loyalty/Achieved';
import TargetLevelCard from 'components/organisms/Loyalty/TargetLevelCard';
import PromoDetail from 'components/molecules/PromoDetail';
import Modal from 'components/atoms/Modal';
import useStore from 'store';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const loyalty = useStore((state) => state.loyalty);

  function closeModal() {
    setIsOpen(false);
  }

  const onModelOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {loyalty ? (
        <>
          <SEO title='Loyalty' desc='Loyalty Description' />
          <ItemDescription
	        title="Loyalty"
	        type="TitleBanner"
	        image="/bgsample-mt.jpg"
	      />
          <MobileProductSelect list={menuItems} select={menuItems[0]} />
          <div className='max-w-7xl mx-auto p-4 flex'>
            <Sidebar selected={ROUTE_LOYALTY} menuItems={menuItems} />
            <Modal isOpen={isOpen} closeModal={closeModal}>
              <PromoDetail />
            </Modal>
            <div className='grow overflow-hidden p-1 py-4'>
              {/* Loyalty Points */}
              <div className='lg:inline-flex gap-5 w-full'>
                <div className='w-full lg:w-2/3 mb-5 lg:mb-0'>
                  <AchievedPointsCard type='standard' points='254' user='Mamode Pierre' />
                </div>

                <div className='w-full lg:w-1/3 mb-5 lg:mb-0'>
                  <TargetLevelCard type='bronze' goal='250' />
                </div>
              </div>

              {/* Special Offer section */}
              <div className='my-10'>
                <div className='flex items-center justify-between'>
                  <h1 className='text-2xl lg:text-5xl text-[#474747]'>Special Offers</h1>
                  <Link href='#'>
                    <a className='flex items-center  text-base text-[#003E5C] font-bold'>
                      See all <ChevronRightIcon className='w-5 h-5' />
                    </a>
                  </Link>
                </div>

                <SpecialOffersCard
                  image='/offer1.png'
                  promo='MT2022ECS'
                  valid='22.05.2022'
                  percentage='10%'
                  onBtnClick={onModelOpen}
                />
              </div>

              {/* Loyalty */}
              <EarnPointCard />
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
};

Dashboard.Layout = MainLayout;

export default Dashboard;
