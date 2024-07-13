/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 11 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ROUTE_MARKETPLACE } from 'constants/routes';

type ListItem = {
  title: string;
  id: string;
  path: { pathname: string; query: { category: string } };
};
const PathHighlight = (url, marketplace, urlQuery, pathQuery) => {
  if (pathQuery !== undefined) {
    if (urlQuery['category'] === pathQuery['category']) {
      return true;
    }
    return false;
  } else if (url === marketplace) {
    return true;
  }
};
const MarketplaceTopNav = ({ menuItems }: { menuItems: ListItem[] }) => {
  const router = useRouter();

  return (
    <div className='items-center justify-between hidden md:flex mb-8 border-b'>
      <ul className='flex items-center overflow-auto'>
        {menuItems.map((item) => (
          <li className='hoverable ' key={item.id}>
            <Link href={item.path}>
              <a
                className={`px-4 py-2 whitespace-nowrap flex items-center font-semibold relative after:relative after:top-[-1px] ${
                  PathHighlight(router.asPath, ROUTE_MARKETPLACE, router.query, item.path.query)
                    ? 'text-skyBlue'
                    : 'text-mtBlue'
                }`}
              >
                {item.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketplaceTopNav;
