/**
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 17 November 2022, 17:51
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { authHeader } from '@/api';
import { AxiosInstance } from 'axios';

export default (axios: AxiosInstance, base: string) => {
  const config = {
    headers: authHeader,
  };

  return {
    sendOTP: async (payload: { action: 'CHECKOUT' | 'LOGIN' | 'PROFILE_UPDATE' | 'REGISTER'; type: 'EMAIL' | 'SMS' | 'SMS_EMAIL' }) => {
      try {
        const res = await axios.post(`${base}/otp`, payload, config);
        return res?.data;
      } catch (error) {
        console.error(`🚀 Error in 'api.otp.sendOTP'`, error);
        return [];
      }
    },
  };
};
