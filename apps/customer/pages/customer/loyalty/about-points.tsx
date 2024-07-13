/*
 * File: point-history.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 25 May 2022 04:21 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import MainLayout from 'components/layouts/MainLayout';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import Sidebar from 'components/molecules/Sidebar';
import SEO from 'components/utils/SEO';
import menuItems from 'constants/loyalty/menuItems';
import MobileProductSelect from 'components/molecules/MobileSelect';
import { ROUTE_LOYALTY_ABOUT_POINTS } from 'constants/routes';
import LoyaltyLevelsCard from 'components/organisms/Loyalty/LoyaltyLevelsCard';

const AboutPoints = () => {
  return (
    <>
      <SEO title='Loyalty' desc='Loyalty Description' />
      <ItemDescription title='Loyalty' type='TitleBanner' image='/bgsample-mt.jpg' />
      <MobileProductSelect list={menuItems} select={menuItems[3]} />

      <div className='max-w-7xl mx-auto p-4 flex'>
        <Sidebar selected={ROUTE_LOYALTY_ABOUT_POINTS} menuItems={menuItems} />
        <div className='grow overflow-hidden p-1 py-4'>
          <div>
            <h1 className='text-4xl text-[#474747] mb-4'>Loyalty Levels</h1>
            <LoyaltyLevelsCard type='standard' from='0' to='250' />
            <LoyaltyLevelsCard type='bronze' from='251' to='500' />
            <LoyaltyLevelsCard type='silver' from='501' to='750' />
          </div>
          <div className='my-8'>
            <h1 className='text-2xl lg:text-4xl text-[#474747]'>Loyalty Point Earning</h1>
            <div className='mt-4 lg:mt-8 ml-10'>
              <div className='my-3'>
                <h2 className='text-2xl text-[#474747] leading-loose'>Loyalty Point Earning</h2>
                <p className='text-base text-[#757575]'>
                  Consectetur convallis placerat eu, aliquet. Bibendum sed ac tempor, enim,
                  pellentesque non faucibus ultricies. Amet ut facilisis habitant eget mauris congue
                  risus nunc, elementum. Malesuada nibh vitae, sapien tellus sagittis et dui.
                </p>
              </div>
              <div className='my-3'>
                <h2 className='text-2xl text-[#474747] leading-loose'>Loyalty Point Earning</h2>
                <p className='text-base text-[#757575]'>
                  Consectetur convallis placerat eu, aliquet. Bibendum sed ac tempor, enim,
                  pellentesque non faucibus ultricies. Amet ut facilisis habitant eget mauris congue
                  risus nunc, elementum. Malesuada nibh vitae, sapien tellus sagittis et dui.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPoints;
AboutPoints.Layout = MainLayout;
