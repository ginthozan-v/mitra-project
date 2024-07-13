/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: Monday, 18 July 2022 06:25 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { authHeader } from 'api';
import { Axios } from 'axios';

/* eslint-disable import/no-anonymous-default-export */
export default (axios: Axios, base: string) => {
  const config = {
    headers: authHeader,
  };
  return {
    getGeneralSettings: async () => {
      try {
        const res = await axios.get(`${base}/general`, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/user/settings'`, error.message);
        return error.response;
      }
    },
    saveGeneralSettings: async (payload: { preferredCurrency: string; preferredLanguage: string }) => {
      try {
        const res = await axios.put(`${base}/general`, payload, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/user/settings'`, error.message);
        return error.response;
      }
    },
    getPostpaidSettings: async () => {
      try {
        const res = await axios.get(`${base}/postpaid`, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/user/settings'`, error.message);
        return error.response;
      }
    },
    savePostpaidSettings: async (payload: { billingAccountNumber: string; fixedLineNumber: string }) => {
      try {
        const res = await axios.put(`${base}/postpaid`, payload, config);
        return res;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/user/settings'`, error.message);
        return error.response;
      }
    },
    getSecuritySettings: async () => {
      try {
        const res = await axios.get(`${base}/security`, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/user/settings'`, error.message);
        return error.response;
      }
    },
    saveSecuritySettings: async (payload: { preferredTFAMethod: string }) => {
      try {
        const res = await axios.put(`${base}/security`, payload, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/user/settings'`, error.message);
        return error.response;
      }
    },
  };
};
