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
import { PRODUCT_CODE } from '@/models';
import PriceList from '@/components/organisms/Product/PriceList';

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

  const regions = await api.products.getRegions(true);
  const productTypes = (await api.products.getProductSubcategories(true)).filter((c) => {
    return c.productSubCategoryCode !== PRODUCT_CODE.CSBS;
  });

  const productCodes = {};
  productTypes.forEach((element) => {
    productCodes[element.productSubCategoryCode] = element.subCategoryId;
  });

  return {
    props: {
      //   seo,
      //   productCode: product?.productSubCategoryCode || '',
      //   productTitle: product?.productSubCategoryTitle || '',
      //   productDesc: product?.productSubCategoryShortDescription || '',
      regions,
      productTypes,
      productCodes,
    },
  };
};

const Pricing = ({ regions, productTypes, productCodes }) => {
  const title = 'Pricing';

  return (
    <>
      <SEO title={title} desc={''} keywords={''} />
      <ItemDescription title={title} description={''} type='TitleBanner' image='/products.jpg' />
      <div className='max-w-7xl mx-auto p-4'>
        <PriceList {...{ productTypes, productCodes, regions }} />
      </div>
    </>
  );
};

Pricing.Layout = MainLayout;

export default Pricing;
