/*
 * File: overview.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 8 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import TabSet from 'components/molecules/TabSet';
import tabData from 'constants/marketplace/tabs';
import api from 'api';
import { useState, useEffect } from 'react';
import { isLoggedIn, authNavigate } from 'utils/auth';
import ProductAdvantageCard from 'components/atoms/ProductAdvantageCard';
import Image from 'next/image';
import { IMAGE_PATH } from '@/constants';
import useStore from '@/store';

export async function getServerSideProps({ params, locale }) {
  const subCategoryId = params.itemId;

  const res = await api.marketplace.getMarketplaceAdvantages(subCategoryId, locale, true);

  const subCategoryData = res.map(
    ({
      keywords,
      subCategoryId,
      productSubCategoryTitle,
      productSubCategoryShortDescription,
      isExternalLink,
      provider,
      providerUrl,
      banner,
      advantages,
    }) => ({
      keywords,
      subCategoryId,
      productSubCategoryTitle,
      productSubCategoryShortDescription,
      isExternalLink,
      provider,
      providerUrl,
      banner,
      advantages: advantages.map(({ advantageId, productCategoryAdvantageTitle, productCategoryAdvantageDescription, icon }) => ({
        advantageId,
        productCategoryAdvantageTitle,
        productCategoryAdvantageDescription,
        icon,
      })),
    }),
  );

  const seo = {
    title: '',
    keywords: '',
    desc: '',
  };

  if (subCategoryData.length > 0) {
    seo.title = subCategoryData[0].productSubCategoryTitle;
    seo.keywords = subCategoryData[0].keywords;
    seo.desc = subCategoryData[0].productSubCategoryShortDescription;
  }

  return {
    props: {
      seo,
      subCategoryData,
    },
  };
}
const Overview = ({ seo, subCategoryData }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const status = useStore((state) => state.status);

  let isDisabled = false;
  if (status === 'CREATIO_FAILED') {
    isDisabled = true;
  }

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  const clickHandle = (path: string) => {
    if (!path.startsWith('http:') && !path.startsWith('https:')) {
      path = '//' + path;
    }
    document.location.href = path;
  };

  const clickInternal = () => {
    if (isAuthenticated) {
      const path = '';
      document.location.href = path;
    } else {
      authNavigate();
    }
  };

  return (
    <>
      <SEO title={seo.title} keywords={seo.keywords} desc={seo.desc} />
      <ItemDescription
        title={subCategoryData[0].productSubCategoryTitle}
        description={subCategoryData[0].productSubCategoryShortDescription}
        type='TitleBanner'
        image={subCategoryData[0].banner === null ? '/bgsample-mt.jpg' : `${IMAGE_PATH}/${subCategoryData[0].banner}`}
      >
        <div className='flex flex-row pl-3 py-1 md:py-2'>
          <button
            className={`px-2 py-1 ${
              isDisabled ? 'bg-[#BFBFBF] text-[#474747] cursor-not-allowed' : 'bg-skyBlue text-white'
            } rounded-md text-sm font-semibold`}
            onClick={() => {
              subCategoryData[0].isExternalLink ? clickHandle(subCategoryData[0].providerUrl) : clickInternal();
            }}
          >
            {subCategoryData[0].isExternalLink ? subCategoryData[0].provider : 'Buy Now'}
          </button>
          {subCategoryData[0].isExternalLink ? null : (
            <div className='px-2 md:px-6'>
              <Image src='/share.png' width={'24px'} height={'24px'} alt={''} className='w-6 h-6 md:w-8 md:h-8' />
            </div>
          )}
        </div>
      </ItemDescription>
      <div className='content-wrapper py-4'>
        {subCategoryData[0].isExternalLink ? null : <TabSet tabData={tabData} selectedTab={0} />}

        <h1 className='content-heading'>Product Advantages</h1>
        {subCategoryData[0].advantages.length !== 0 ? (
          <div className='flex flex-wrap -mx-2'>
            {subCategoryData[0].advantages
              .slice(0, 6)
              .map(({ advantageId, productCategoryAdvantageTitle, productCategoryAdvantageDescription, icon }) => (
                <ProductAdvantageCard
                  key={advantageId}
                  icon={icon}
                  title={productCategoryAdvantageTitle}
                  description={productCategoryAdvantageDescription}
                />
                // <div className='w-full md:w-1/2 p-2' key={advantageId}>
                //   <div className='bg-white shadow rounded-md flex p-3 h-full'>
                //     <img
                //       src={`data:image/jpeg;base64,${icon}`}
                //       className='w-8 h-8 md:w-12 md:h-12'
                //     />

                //     <div className='pl-2'>
                //       <h3 className='text-md font-medium'>{productCategoryAdvantageTitle}</h3>
                //       <p className='line-clamp-3 text-sm mt-2 leading-6'>
                //         {productCategoryAdvantageDescription}
                //       </p>
                //     </div>
                //   </div>
                // </div>
              ))}
          </div>
        ) : (
          <div className='no-data'>No advantages found.</div>
        )}
      </div>
    </>
  );
};

export default Overview;

Overview.Layout = MainLayout;
