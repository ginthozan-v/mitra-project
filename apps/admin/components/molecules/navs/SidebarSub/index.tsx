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
import type { MenuItem } from 'constants/routingConfig/types';
import { Fragment } from 'react';
import useNavigation from 'hooks/useNavigation';

const SidebarSub = ({ routeSettings }: PropsRouteSettings) => {
  const menuItems = useNavigation();

  const selected: MenuItem = menuItems.find((i) => i.id === routeSettings.primary);

  if (!routeSettings.secondary || !selected) {
    return null;
  }

  return (
    <div className='bg-cms-base-10 w-64 h-full shrink-0 border-r border-r-cms-base-40 p-3 overflow-y-auto subnav'>
      {selected.secondaryItems.map(({ id, title, items }) => (
        <Fragment key={id}>
          {/* {subcategories.includes(code) && ( */}
          <div className='border-gray-100 border-b-2 pb-3 mb-3'>
            <div className='font-bold px-2 text-cms-base-700 mb-2'>{title}</div>
            {items.map(({ id, code, route, title }) => (
              <Fragment key={id}>
                {/* {pages.includes(code) && ( */}
                <Link href={route}>
                  <a
                    className={`block py-1 px-2 rounded-md ${
                      routeSettings.secondary === id
                        ? 'text-cms-blue-400 bg-cms-base-30 font-semibold'
                        : 'text-cms-base-400 bg-cms-base-10'
                    }`}
                  >
                    {title}
                  </a>
                </Link>
                {/* )} */}
              </Fragment>
            ))}
          </div>
          {/* )} */}
        </Fragment>
      ))}
    </div>
  );
};

export default SidebarSub;
