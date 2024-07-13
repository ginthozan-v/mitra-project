/**
 * File: [itemId].tsx
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 16 November 2022, 11:14
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import api from '@/api';
import { useEffect, useState } from 'react';
import { getAuth } from '@/utils/auth';
import AuthGuard from '@/components/utils/AuthGuard';
import HuaweiPortal from '@/components/molecules/HuaweiPortal';

export const getServerSideProps = async ({ params, locale }) => {
  const seo = {
    title: '',
    keywords: '',
    desc: '',
  };

  const res = await api.products.getPrebuildOffers(params.productId, locale, 'MUR', false, true);
  let product;

  if (res?.length > 0) {
    product = res.find((product) => product.productId === params.itemId);
    seo.title = product.productName;
    // seo.keywords = product.keywords;
    seo.desc = product.description;
  }

  return {
    props: {
      seo,
      productCode: product?.displayItemCode || '',
      productTitle: product?.productName || '',
      productDesc: product?.description || '',
      product,
    },
  };
};

const Config = ({ seo, productCode, productTitle, productDesc, product }) => {
  const userId = getAuth()?.userid;
  const [url, setUrl] = useState<any>();

  const getBuilder = () => {
    if (userId)
      api.huawei.getUserProduct(userId, product.productId, product.region.code).then((res) => {
        if (res.product_id && res.vdc_id) {
          // setUrl(`https://console.myt.mu/ecm/?locale=en-us#/ecs/createVm?productId=${res.product_id}&online_vdc_id=${res.vdc_id}`);
          setUrl('https://console-intl.huaweicloud.com/ecm/?region=ap-southeast-1#/ecs/createVm');
        }
      });
  };

  useEffect(() => {
    getBuilder();
  }, []);

  return (
    <>
      <SEO title={seo.title} desc={seo.desc} keywords={seo.keywords} />
      <ItemDescription title={productTitle} description={productDesc} type='TitleBanner' image='/products.jpg' />
      <HuaweiPortal url={url} className='w-full h-[700px]' />

      {/* <div className='max-w-7xl mx-auto p-4'>{url && <iframe width='100%' height='700' src={url}></iframe>}</div>
      {confirm && (
        <Confirm
          open={confirm}
          heading='Purchase'
          content={`Received the Resource purchase request. Do you want to load the Shopping cart and continue the payment?`}
          confirmButtonLabel='Go to Cart'
          cancelButtonLabel='Stay here'
          onConfirm={() => push(ROUTE_CART)}
          onCancel={() => {
            setConfirm(false);
          }}
        />
      )} */}
    </>
  );
};

Config.Layout = MainLayout;

export default AuthGuard(Config);
