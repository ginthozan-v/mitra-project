/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: Monday, 7 March 2022 08:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import api from 'api';
import BannerSlider from 'components/atoms/BannerSlider';
import HomeLayout from 'components/layouts/HomeLayout';
import FeaturedProducts from 'components/organisms/Home/FeaturedProducts';
import LoyaltyScheme from 'components/organisms/Home/LoyaltyScheme';
import SpecialOffers from 'components/organisms/Home/SpecialOffers';
import SEO from 'components/utils/SEO';
import { NETWORK_STATUS_CODES, STATIC_REVALIDATION_DURATION } from '@/constants';
import payload from 'constants/registration/user';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
// import useStore from 'store';
import { isLoggedIn } from 'utils/auth';
// import getStaticData from 'utils/staticData';

export async function getStaticProps({ locale }) {
  // const topStack = await getStaticData(api, true);
  const res = await api.home.getAllHeroBanner(locale, true);
  const response = await api.home.getFeaturedProducts(locale, true);
  const loyalty = await api.home.getAllLoyalty(locale, true);
  const promotions = await api.home.getAllPromotions(locale, true);
  const featuredData = [];
  const sliderData = [];
  const loyaltyData = [];
  const promoData = [];

  res.map((item) => {
    if (item.active) {
      const currentDate = new Date();
      const startDate = new Date(item.startDateTime);
      const endDate = new Date(item.endDateTime);
      if (currentDate > startDate && currentDate < endDate) {
        sliderData.push(item);
      }
    }
  });
  sliderData.sort((a, b) => a.priority - b.priority);
  response.map((item) => {
    if (item.active) {
      const today = new Date();
      const sDate = new Date(item.startDateTime);
      const eDate = new Date(item.endDateTime);
      if (today > sDate && today < eDate) {
        featuredData.push(item);
      }
    }
  });
  loyalty.map((item) => {
    if (item.active) {
      loyaltyData.push(item);
    }
  });
  promotions.map((item) => {
    if (item.active) {
      promoData.push(item);
    }
  });
  featuredData.sort((a, b) => a.priority - b.priority);

  return {
    revalidate: STATIC_REVALIDATION_DURATION,
    props: {
      // ...topStack,
      sliderData,
      featuredData,
      loyaltyData,
      promoData,
    },
  };
}

function Home({ logo, primaryMenu, sliderData, featuredData, loyaltyData, promoData }) {
  // const { setLogo, setPrimaryMenu } = useStore((state) => ({
  //   setLogo: state.setLogo,
  //   setPrimaryMenu: state.setPrimaryMenu,
  // }));

  useEffect(() => {
    // getMenuData();
    // setLogo(logo);
    // setPrimaryMenu(primaryMenu || []);
    getData();
  }, []);

  // const getMenuData = async () => {
  //   const { logo: l, primaryMenu: menu } = await getStaticData(api);
  //   setLogo(logo || l);
  //   setPrimaryMenu(Array.from(new Set([...primaryMenu, ...menu])));
  // };

  const getData = async () => {
    try {
      if (isLoggedIn()) {
        const res = await api.register.getUser();
        if (typeof res === 'string' && !NETWORK_STATUS_CODES.includes(res)) {
          toast.error('Something went wrong');
        } else {
          if (typeof window !== 'undefined') {
            localStorage.setItem('logged-user', JSON.stringify(res));
          }
        }
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem('new-userEn', JSON.stringify(payload.payloadEn));
    localStorage.setItem('new-userIn', JSON.stringify(payload.payloadIn));
    localStorage.removeItem('step');
    localStorage.removeItem('userIdEn');
    localStorage.removeItem('userIdIn');
    localStorage.removeItem('idPassportFile');
    localStorage.removeItem('idPassportFileIn');
    localStorage.removeItem('businessRegCertificate');
    localStorage.removeItem('addressProof');
    localStorage.removeItem('addressProofIn');
    localStorage.removeItem('incorporation');
    localStorage.removeItem('VAT');
  }

  return (
    <>
      <SEO title='MT Cloud' desc='Site Description' />
      {/* <div className='mt-18 md:mt-[calc(7rem+1px)]'> */}
      <BannerSlider images={sliderData} className='relative w-full h-[31rem]' />
      {/* </div> */}
      <FeaturedProducts featuredData={featuredData} />
      {loyaltyData.length !== 0 && <LoyaltyScheme loyaltyData={loyaltyData} />}
      {promoData.length !== 0 && <SpecialOffers promotionData={promoData} />}
    </>
  );
}

Home.Layout = HomeLayout;

export default Home;
