/**
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 23 August 2022, 11:11
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { UserPermission } from 'types';

export default (axios: any, api_url: string) => ({
  get: async (): Promise<UserPermission[]> => {
    try {
      const res = await axios.get(api_url);
      return res?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/permissions line: 18', error);
      throw error;
    }
  },
});
