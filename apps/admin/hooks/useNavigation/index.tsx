/**
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 26 August 2022, 17:26
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { createContext, useContext, useEffect, useState } from 'react';

import type { PropsReactChildren } from '@mtcloud/globals/types';
import usePermission from 'hooks/usePermission';
import { menuItems } from 'constants/routingConfig';

const NavigationContext = createContext([]);

export function NavigationProvider({ children }: PropsReactChildren) {
  const [nav, setNav] = useState([]);
  const permission = usePermission().all();

  useEffect(() => {
    const categories = permission?.categories?.map((c) => c.code);
    const subcategories = permission?.subcategories?.map((c) => c.code);
    const pages = permission?.pages?.map((c) => c.code);

    let routeList = [],
      firstActiveLink;
    const navItems = [...menuItems].filter((c) => {
      if (categories?.includes(c.code)) {
        const secondaryItems = c.secondaryItems.filter((s, index) => {
          if (subcategories?.includes(s.code)) {
            let pageList = [];
            s.items = s.items.filter((i) => {
              if (pages.includes(i.code)) {
                pageList.push({ ...i, accessible: true });
                return true;
              } else {
                pageList.push(i);
              }
              return false;
            });

            routeList = [...routeList, ...pageList];

            if (index === 0 && s.items.length > 0) {
              c.defaultRoute = s.items[0].route;
            }
            return true;
          }
          return false;
        });
        c.secondaryItems = secondaryItems;
        return true;
      }
      return false;
    });

    firstActiveLink = routeList.find((r) => r.accessible);
    if (firstActiveLink) routeList.push(firstActiveLink);

    // const handleRouteChange = (url) => {
    //   let currentRouteIndex = -1;
    //   const currentRoute = routeList.find((r, i) => {
    //     if (r.route == url) {
    //       currentRouteIndex = i;
    //       return true;
    //     }
    //     return false;
    //   });
    //   console.log(routeList, url, currentRoute);
    //   if (!currentRoute.accessible) {
    //     // redirect first/next available route...
    //   }
    // };

    // if (typeof window !== 'undefined') {
    //   window.addEventListener('load', () => {
    //     handleRouteChange(window.location.pathname);
    //   });
    // }

    setNav(navItems);
  }, [permission]);

  return <NavigationContext.Provider value={nav}>{children}</NavigationContext.Provider>;
}

const useNavigation = () => {
  return useContext(NavigationContext);
};

export default useNavigation;
