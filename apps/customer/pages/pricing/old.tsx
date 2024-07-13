/**
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: 06 December 2022, 10:16
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import api from '@/api';
import { BILLING_TYPE, PRODUCT_CODE } from '@/models';
import useStore from '@/store';
import { useEffect, useState } from 'react';
import PriceListOld from '@/components/organisms/Product/PriceListOld';

export const getServerSideProps = async ({ params, locale }) => {
  //   const seo = {
  //     title: '',
  //     keywords: '',
  //     desc: '',
  //   };

  //   const res = await api.products.getAdvantages(params.productId, locale, true);
  //   let product;

  //   if (res?.length > 0) {
  //     product = res[0];
  //     seo.title = product.productSubCategoryTitle;
  //     seo.keywords = product.keywords;
  //     seo.desc = product.productSubCategoryShortDescription;
  //   }

  const meta = await api.products.getAllMeta(true);
  const billingTypes = Object.keys(BILLING_TYPE).map((t) => ({
    key: t,
    value: BILLING_TYPE[t],
  }));
  const productType = Object.keys(PRODUCT_CODE).map((t) => ({
    key: t,
    value: PRODUCT_CODE[t],
  }));

  return {
    props: {
      //   seo,
      //   productCode: product?.productSubCategoryCode || '',
      //   productTitle: product?.productSubCategoryTitle || '',
      //   productDesc: product?.productSubCategoryShortDescription || '',
      meta,
      billingTypes,
      productType,
    },
  };
};

const Pricing_Old = ({ meta, billingTypes, productType, data: d }) => {
  const setProductMeta = useStore((store) => store.setProductMeta);
  const [productCode, setProductCode] = useState('ECS');
  const [productTitle, setProductTitle] = useState('');

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
      <>
        {/* <ProductAttribute
          label='Product Type'
          data={productType}
          customMap
          code='key'
          value='value'
          selected={productCode}
          onChange={setProductCode}
        /> */}
        <PriceListOld
          billingTypes={billingTypes}
          availabilityZones={meta.availabilityZones}
          productType={productType}
          setProductCode={setProductCode}
          regions={meta.regions}
          type={'pricing'}
          productCode={productCode}
          {...{ productTitle }}
        />
      </>
    );
  };

  return (
    <>
      <SEO title={productTitle} desc={''} keywords={''} />
      <ItemDescription title={productTitle} description={''} type='TitleBanner' image='/products.jpg' />
      <div className='max-w-7xl mx-auto p-4'>{productBuilder()}</div>
    </>
  );
};

Pricing_Old.Layout = MainLayout;

export default Pricing_Old;
