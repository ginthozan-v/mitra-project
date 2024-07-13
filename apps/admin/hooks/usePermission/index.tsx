/**
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 23 August 2022, 15:43
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { createContext, useContext, useEffect, useState } from 'react';

import type { PropsReactChildren } from '@mtcloud/globals/types';
import api from 'api';
import { RolePermission } from 'models';

const PermissionContext = createContext((filter?: string): any => {});

export function PermissionProvider({ children }: PropsReactChildren) {
  const [permissionData, setPermissionData] = useState({});
  const [permissions, setPermissions] = useState({});

  const filter = (data) => {
    let categories = [],
      subcategories = [],
      pages = [];
    categories = data.filter((c) => {
      if (c.accessible) {
        c.subcategories = c.subcategories.filter((s) => {
          if (s.accessible) {
            const pageList = [];
            s.pages.forEach((p) => {
              const page = new RolePermission(p);
              if (page.accessible) pageList.push(page);
            });
            s.pages = pageList;
            pages = [...pages, ...pageList];
            return true;
          }
          return false;
        });
        subcategories = [...subcategories, ...c.subcategories];
        return true;
      }
      return false;
    });
    return { categories, subcategories, pages };
  };

  const getPermissions = async () => {
    try {
      const res = await api.permissions.get();

      let permissions = {};
      const filteredRes = filter(res);
      filteredRes.pages.forEach((p) => {
        permissions[p.code] = { ...permissions[p.code], ...p };
      });

      setPermissionData(filteredRes);
      setPermissions(permissions);
    } catch (error) {
      console.log('get permission request error >>', error);
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const getPermission = (filter?: string) => {
    return filter ? permissions[filter] : { ...permissions, all: () => permissionData };
  };

  return <PermissionContext.Provider value={getPermission}>{children}</PermissionContext.Provider>;
}

const usePermission = (filter?: string) => {
  return useContext(PermissionContext)(filter);
};

export default usePermission;
