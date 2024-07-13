/**
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 14 November 2022, 14:40
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { AxiosInstance } from 'axios';

export default (axios: AxiosInstance, base: string) => ({
  getPricing: async (payload: any) => {
    try {
      const res = await axios.post(`${base}`, payload);
      return res?.data;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/solutions'`, error.message);
      return [];
    }
  },
});
