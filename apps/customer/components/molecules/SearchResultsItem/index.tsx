/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 25 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import {
  ROUTE_INDUSTRIES,
  ROUTE_MARKETPLACE_OVERVIEW,
  ROUTE_MARKETPLACE_PREBUILD,
  ROUTE_PRODUCT_OVERVIEW,
  ROUTE_PRODUCT_PREBUILD,
} from 'constants/routes';
import { useRouter } from 'next/router';
import React from 'react';
import { createRoute } from 'utils/routes';

type tags = { name: string }[];

const SearchResultsItem = ({
  title,
  description,
  tags,
  id,
  type,
  productId,
  solutionIndustry,
}: {
  title: string;
  description: string;
  tags: tags;
  id: string;
  type?: string;
  productId?: string;
  solutionIndustry?: string;
}) => {
  const router = useRouter();
  const pathSet = () => {
    let path = '';

    tags.forEach((i) => {
      if (i.name !== null && i.name.toLocaleLowerCase() === 'product') {
        path = productPath(type, path);
      } else if (i.name !== null && i.name.toLocaleLowerCase() === 'marketplace') {
        path = marketPlacePath(type, path);
      } else if (i.name !== null && i.name.toLocaleLowerCase() === 'solution') {
        path = ROUTE_INDUSTRIES + '/' + solutionIndustry?.toLowerCase();
        path = path + '?key=' + productId;
      }
    });

    router.push(path);
    return path;
  };

  const productPath = (type: string, path: string) => {
    if (type.toLocaleLowerCase() === 'product') {
      path = createRoute({
        basePath: ROUTE_PRODUCT_PREBUILD,
        params: [{ key: 'productId', element: id }],
      });
      path = path + '?key=' + productId;
    } else {
      path = createRoute({
        basePath: ROUTE_PRODUCT_OVERVIEW,
        params: [{ key: 'productId', element: id }],
      });
    }
    return path;
  };

  const marketPlacePath = (type: string, path: string) => {
    if (type.toLocaleLowerCase() === 'product') {
      path = createRoute({
        basePath: ROUTE_MARKETPLACE_PREBUILD,
        params: [{ key: 'itemId', element: id }],
      });
      path = path + '?key=' + productId;
    } else {
      path = createRoute({
        basePath: ROUTE_MARKETPLACE_OVERVIEW,
        params: [{ key: 'itemId', element: id }],
      });
    }
    return path;
  };

  return (
    <div className='w-full p-2'>
      <a className='bg-white flex p-3 cursor-pointer' onClick={() => pathSet()}>
        <div>
          <h3 className='text-lg font-semibold'>{title}</h3>
          <p className='line-clamp-2 text-justify'>{description}</p>
          <div className='flex flex-row py-3'>
            {tags.map(({ name }) => (
              <div key={name}>
                {name !== null && (
                  <div className='bg-[#D4E6F2] rounded-full line-clamp-1 h-6 text-[#535353] text-sm px-3 py-0.5 mr-3'>
                    {name.charAt(0) + name.toLocaleLowerCase().slice(1)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </a>
      <hr className='bg-[#757575] h-0.5' />
    </div>
  );
};

export default SearchResultsItem;
