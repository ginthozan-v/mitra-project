/*
 * File: list.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Thurseday, 14 July 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import TabSet from 'components/molecules/TabSet';
import tabData from 'constants/marketplace/tabs';
import PrebuildOfferItem from 'components/molecules/products/PrebuildOfferItem';
import api from 'api';
import { useState, useEffect } from 'react';
import { isLoggedIn, authNavigate } from 'utils/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IMAGE_PATH } from '@/constants';
import useStore from '@/store';
import useCurrency from '@/components/hooks/useCurrency';

export async function getServerSideProps({ params }) {
  const subCategoryId = params.itemId;

  return {
    props: {
      subCategoryId,
    },
  };
}

const Prebuild = ({ subCategoryId }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const router = useRouter();
  const [products, setProducts] = useState<any[]>();
  const [subCategoryData, setSubcatData] = useState([]);
  const [seo, setSeo] = useState({
    title: '',
    keywords: '',
    desc: '',
  });
  const status = useStore((state) => state.status);
  const currency = useCurrency();
  const currencyTitle = currency.title;

  let isDisabled = false;
  if (status === 'CREATIO_FAILED') {
    isDisabled = true;
  }

  useEffect(() => {
    getData();
  }, [currencyTitle]);

  const getData = async () => {
    const subcategoryResponse = await api.marketplace.getMarketplaceAdvantages(subCategoryId, router.locale);

    const proId = subcategoryResponse[0].productCatalogId;
    const res = await api.products.getPrebuildOffers(proId, router.locale, currencyTitle, true);
    const proData = res.map(
      ({
        productId,
        productName,
        description,
        displayItemCode,
        price,
        currencySymbol,
        unit,
        priceDisclaimer,
        isEnterpriseClientOnly,
        minimumNumberOfUnitwithinSinglePurchase,
        maximumNumberofUnitwithinSinglePurchase,
        discount,
        specifications,
        otherAttributes,
      }) => ({
        productId,
        productName,
        description,
        displayItemCode,
        price,
        currencySymbol,
        unit,
        priceDisclaimer,
        isEnterpriseClientOnly,
        min: minimumNumberOfUnitwithinSinglePurchase,
        max: maximumNumberofUnitwithinSinglePurchase,
        discount,
        specifications: specifications.map(({ attributeName, attributeVal }) => ({
          attributeName,
          attributeVal,
        })),
        otherAttributes: otherAttributes.map(({ attributeName, attributeVal }) => ({
          attributeName,
          attributeVal,
        })),
      }),
    );

    const seoData = {
      title: '',
      keywords: '',
      desc: '',
    };

    if (subcategoryResponse.length > 0) {
      seoData.title = subcategoryResponse[0].productSubCategoryTitle;
      seoData.keywords = subcategoryResponse[0].keywords;
      seoData.desc = subcategoryResponse[0].productSubCategoryShortDescription;
    }
    setSeo(seoData);
    setSubcatData(subcategoryResponse);
    setProducts(proData.map((product, index) => ({ ...product, isExpand: index === 0 })));
  };

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
        title={subCategoryData[0]?.productSubCategoryTitle}
        description={subCategoryData[0]?.productSubCategoryShortDescription}
        type='TitleBanner'
        image={subCategoryData[0]?.banner === null ? '/bgsample-mt.jpg' : `${IMAGE_PATH}/${subCategoryData[0]?.banner}`}
      >
        <div className='flex flex-row pl-3 py-1 md:py-2'>
          <button
            className={`px-2 py-1 ${
              isDisabled ? 'bg-[#BFBFBF] text-[#474747] cursor-not-allowed' : 'bg-skyBlue text-white'
            } rounded-md text-sm font-semibold`}
            onClick={() => {
              subCategoryData[0]?.isExternalLink ? clickHandle(subCategoryData[0].providerUrl) : clickInternal();
            }}
          >
            {subCategoryData[0]?.isExternalLink ? subCategoryData[0]?.provider : 'Buy Now'}
          </button>
          {subCategoryData[0]?.isExternalLink ? null : (
            <div className='px-2 md:px-6'>
              <Image src='/share.png' width={'24px'} height={'24px'} alt={''} className='w-6 h-6 md:w-8 md:h-8' />
            </div>
          )}
        </div>
      </ItemDescription>
      <div className='max-w-7xl mx-auto p-4'>
        <TabSet tabData={tabData} selectedTab={1} />
        {products ? (
          <>
            {products?.length !== 0 ? (
              <div>
                {products.map((product) => (
                  <PrebuildOfferItem key={product.productId} product={product} subcategory={subCategoryId} getData={getData} currency={currency} />
                ))}
              </div>
            ) : (
              <div className='text-center text-3xl font-medium py-20'>No data found</div>
            )}
          </>
        ) : (
          <div className='text-center text-xl font-medium py-20'>Loading prebuild items...</div>
        )}
      </div>
    </>
  );
};

export default Prebuild;

Prebuild.Layout = MainLayout;
