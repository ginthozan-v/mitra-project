/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 11 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { ChevronRightIcon } from '@mtcloud/ui/atoms/icons';
import NoImage from 'components/atoms/NoImage';
import { ROUTE_MARKETPLACE, ROUTE_MARKETPLACE_OVERVIEW } from 'constants/routes';
import Image from 'next/image';
import Img from 'components/molecules/Img';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { createRoute } from 'utils/routes';
import { IMAGE_PATH } from '@/constants';

type items = {
  subCategoryId: string;
  productSubCategoryTitle: string;
  banner: string;
  productSubCategoryShortDescription: string;
  sortOrder: number;
}[];
const ItemCard = ({ items, heading, path }: { heading: string; path: string; items: items }) => {
  const { asPath } = useRouter();
  items = items.filter(function (element) {
    return element !== null;
  });
  items.sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {items.length !== 0 ? (
        <div className='mt-5'>
          {items.length !== 0 && (
            <div className='flex justify-between mb-1'>
              <h1 className='text-[#474747] section-heading'>{heading}</h1>
              {path !== '' && asPath === ROUTE_MARKETPLACE ? (
                <Link href={path}>
                  <a className='flex items-center text-mtgreen text-base font-semibold'>
                    View all
                    <ChevronRightIcon className='w-5 h-5' />
                  </a>
                </Link>
              ) : null}
            </div>
          )}

          <div className='flex flex-wrap -mx-3'>
            {items?.map(({ subCategoryId, productSubCategoryTitle, banner, productSubCategoryShortDescription }) => (
              <div
                key={subCategoryId}
                className='w-44 md:w-52 h-72 p-3 m-3 bg-white hover:bg-mtgreen text-mtgreen hover:text-white text-left grid place-items-center shadow rounded-md relative'
              >
                {/* <img
                  src={`${IMAGE_PATH}/${banner}`}
                  className='rounded-md'
                  width={'80px'}
                  height={'80px'}
                  alt='Image'
                /> */}
                <Img
                  src={`${IMAGE_PATH}/${banner}`}
                  // src={`https://portal-qa-gateway.mytcloud.mu/cms/1.0.0/static-content/market_sub_cat_b4b75395-a7ae-4e0c-aa8d-24d45aa1c358_banner_en`}
                  className='rounded-md'
                  alt='Image'
                  width={80}
                  height={80}
                  // layout='fill'
                />
                {/* <NoImage className='w-20 h-20 rounded-md' /> */}

                <div className='text-center text-base hover:text-white font-medium'>{productSubCategoryTitle}</div>
                {productSubCategoryShortDescription.length > 0 ? (
                  <span className='line-clamp-3 text-sm hover:text-white font-normal'>{productSubCategoryShortDescription}</span>
                ) : null}

                <Link
                  href={createRoute({
                    basePath: ROUTE_MARKETPLACE_OVERVIEW,
                    params: [{ key: 'itemId', element: subCategoryId }],
                  })}
                >
                  <a className='p-2 flex items-center bg-white text-mtgreen h-7 rounded text-sm font-semibold'>
                    view details
                    <ChevronRightIcon className='w-5 h-5' />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ItemCard;
