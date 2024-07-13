/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: Monday, 18 July 2022 06:25 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { Axios } from 'axios';

export enum GENERIC_CONTENT {
  ABOUT_US = 'ABOUT_US',
  CONTACT_US = 'CONTACT_US',
  AUTO_LOGOUT = 'AUTO_LOGOUT',
  COPYRIGHTS = 'COPYRIGHTS',
  HOME_LOGO = 'HOME_LOGO',
  TERMS_CONDITIONS = 'TERMS_CONDITIONS',
  PROMOTION_SECTION = 'PROMOTION_SECTION',
  LOYALTY_IS_ACTIVE = 'LOYALTY_IS_ACTIVE',
  PAYMENT_TNC = 'PAYMENT_TNC'
}

/* eslint-disable import/no-anonymous-default-export */
export default (axios: Axios, base: string, base_server: string) => {
  return {
    get: async (key: string, isServerSide = false) => {
      try {
        const res = await axios.get(`${isServerSide ? base_server : base}?position=${key}`);
        return JSON.parse(res?.data?.content?.data || null);
      } catch (error) {
        console.error(`🚀 Error in 'api/generic-content'`, error);
        return null;
      }
    },
  };
};
