/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 24 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import type { PropsRouteSettings } from 'constants/types';
import Link from 'next/link';
import { Fragment } from 'react';
import useNavigation from 'hooks/useNavigation';

const SidebarMain = ({ routeSettings }: PropsRouteSettings) => {
  const menuItems = useNavigation();

  return (
    <div className='flex flex-col items-center w-16 h-full pt-5 space-y-4 border-r bg-cms-base-10 shrink-0 border-r-cms-base-40 mainnav'>
      {menuItems.map(({ id, Icon, defaultRoute }) => (
        <Fragment key={id}>
          {/* {categories.includes(code) && ( */}
          <Link href={defaultRoute}>
            <a
              className={`w-10 h-10 rounded-md  grid place-items-center  ${
                id === routeSettings.primary ? 'bg-blue-200' : 'bg-blue-50'
              }`}
            >
              <Icon className='w-7 h-7 text-cms-base-700' />
            </a>
          </Link>
          {/* )} */}
        </Fragment>
      ))}
    </div>
  );
};

export default SidebarMain;
