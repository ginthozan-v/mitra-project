/*
 * File: prebuild.tsx
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
import tabData from 'constants/products/tabs';
import PrebuildOfferItem from 'components/molecules/products/PrebuildOfferItem';
import api from 'api';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IMAGE_PATH } from '@/constants';
import useStore from '@/store';
import useCurrency from '@/components/hooks/useCurrency';

export async function getServerSideProps({ params }) {
  const subCategoryId = params.productId;

  return {
    props: {
      subCategoryId,
    },
  };
}

const Prebuild = ({ subCategoryId }) => {
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
    const subcategoryResponse = await api.products.getAdvantages(subCategoryId, router.locale);
    const subData = subcategoryResponse.map(({ keywords, subCategoryId, productSubCategoryTitle, productSubCategoryShortDescription, banner }) => ({
      keywords,
      subCategoryId,
      productSubCategoryTitle,
      productSubCategoryShortDescription,
      banner,
    }));
    const res = await api.products.getPrebuildOffers(subCategoryId, router.locale, currencyTitle, false);
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
        region,
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
        region,
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
    if (subData.length > 0) {
      seoData.title = subData[0].productSubCategoryTitle;
      seoData.keywords = subData[0].keywords;
      seoData.desc = subData[0].productSubCategoryShortDescription;
    }
    setSeo(seoData);
    setSubcatData(subData);
    setProducts(proData.map((product, index) => ({ ...product, isExpand: index === 0 })));
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
        <div className='flex flex-row pl-3'>
          <button
            className={`px-2 py-1 w-20 ${isDisabled ? 'bg-[#BFBFBF] text-[#474747]' : 'bg-skyBlue text-white'} rounded-md text-sm font-semibold`}
          >
            Buy Now
          </button>
          <div className='px-2 md:px-6'>
            <Image src='/share.png' width={'24px'} height={'24px'} alt={''} className='w-6 h-6 md:w-8 md:h-8' />
          </div>
        </div>
      </ItemDescription>
      <div className='max-w-7xl mx-auto p-4'>
        <TabSet tabData={tabData} selectedTab={1} />
        {products ? (
          <>
            {products?.length !== 0 ? (
              <div>
                {products.map((product) => (
                  <PrebuildOfferItem key={product.productId} subcategory={subCategoryId} product={product} getData={getData} currency={currency} />
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
