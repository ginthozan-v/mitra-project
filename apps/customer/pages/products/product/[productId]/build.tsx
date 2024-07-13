/*
 * File: build.tsx
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
import ProductBuilder from '@/components/organisms/Product/ProductBuilder';
import api from '@/api';
import { BILLING_TYPE, PRODUCT_CODE } from '@/models';
import useStore from '@/store';
import { useEffect } from 'react';

export const getServerSideProps = async ({ params, locale }) => {
  const seo = {
    title: '',
    keywords: '',
    desc: '',
  };

  const res = await api.products.getAdvantages(params.productId, locale, true);
  let product;

  if (res?.length > 0) {
    product = res[0];
    seo.title = product.productSubCategoryTitle;
    seo.keywords = product.keywords;
    seo.desc = product.productSubCategoryShortDescription;
  }

  const meta = await api.products.getAllMeta(true);
  const billingTypes = Object.keys(BILLING_TYPE).map((t) => ({
    key: t,
    value: BILLING_TYPE[t],
  }));

  return {
    props: {
      seo,
      productCode: product?.productSubCategoryCode || '',
      productTitle: product?.productSubCategoryTitle || '',
      productDesc: product?.productSubCategoryShortDescription || '',
      meta,
      billingTypes,
    },
  };
};

const Build = ({ seo, productCode, productTitle, productDesc, meta, billingTypes, data: d }) => {
  const setProductMeta = useStore((store) => store.setProductMeta);

  useEffect(() => {
    setProductMeta(meta);
  }, []);

  const productBuilder = () => {
    if (
      (productCode === PRODUCT_CODE.ELB && meta?.regions?.length === 0) ||
      (productCode !== PRODUCT_CODE.ELB && meta?.availabilityZones?.length === 0)
    ) {
      return <div>{productCode === PRODUCT_CODE.ELB ? 'No regions found.' : 'No availability zones found.'}</div>;
    }
    return (
      <ProductBuilder
        billingTypes={billingTypes}
        availabilityZones={meta.availabilityZones}
        regions={meta.regions}
        {...{ productCode, productTitle }}
      />
    );
  };

  return (
    <>
      <SEO title={seo.title} desc={seo.desc} keywords={seo.keywords} />
      <ItemDescription title={productTitle} description={productDesc} type='TitleBanner' image='/products.jpg' />
      <div className='max-w-7xl mx-auto p-4'>
        <TabSet tabData={tabData} selectedTab={2} />
        {productBuilder()}
      </div>
    </>
  );
};

Build.Layout = MainLayout;

export default Build;
