/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 08 August 2022 10:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import {
  ROUTE_PRODUCT_OVERVIEW,
  ROUTE_MARKETPLACE_OVERVIEW,
  ROUTE_INDUSTRIES,
} from 'constants/routes';
import Img from 'components/molecules/Img';
import { IMAGE_PATH } from '@/constants';
import Link from 'next/link';
import React from 'react';
import { createRoute } from 'utils/routes';

const FeaturedProductsItem = ({
  productId,
  type,
  shortDescription,
  displayName,
  solutionIndustry,
  icon,
}: {
  productId: string;
  type: string;
  shortDescription: string;
  displayName: string;
  solutionIndustry: string;
  icon: string;
}) => {
  const pathSet = () => {
    let path = '';

    if (type === 'PRODUCT_LEVEL_2') {
      path = createRoute({
        basePath: ROUTE_PRODUCT_OVERVIEW,
        params: [{ key: 'productId', element: productId }],
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem('productId', productId);
      }
    } else if (type === 'MARKETPLACE_LEVEL_2') {
      path = createRoute({
        basePath: ROUTE_MARKETPLACE_OVERVIEW,
        params: [{ key: 'itemId', element: productId }],
      });
    } else if (type === 'SOLUTION') {
      solutionIndustry = solutionIndustry?.toLowerCase().replace(/ /g, '-');
      path = ROUTE_INDUSTRIES + '/' + solutionIndustry;
      if (typeof window !== 'undefined') {
        localStorage.setItem('id', productId);
      }
    }
    return path;
  };
  return (
    <Link href={pathSet()}>
      <a className='w-full md:w-1/2 p-2 '>
        <div className='shadow rounded-md flex p-2 bg-white'>
          <div className='h-28 w-28 rounded-md overflow-hidden shrink-0 relative'>
            <Img src={`${IMAGE_PATH}/${icon}`} className='w-full h-full' layout='fill' />
          </div>
          <div className='px-2'>
            <h3 className='font-semibold'>{displayName}</h3>
            <p className='text-sm'>{shortDescription}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default FeaturedProductsItem;
