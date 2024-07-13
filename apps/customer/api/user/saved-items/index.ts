/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: Monday, 15 August 2022 12:40 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { authHeader } from 'api';

/* eslint-disable import/no-anonymous-default-export */
export default (axios, version: string, base: string) => {
  const config = {
    headers: authHeader,
  };

  return {
    addToCart: async (itemId: string) => {
      try {
        const res = await axios.put(`${base}cart/${version}/cart/saved-item/${itemId}/send-to-cart`, {}, config);
        return res;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/cart'`, error.message);
        return error.code;
      }
    },

    addToCartAll: async () => {
      try {
        const res = await axios.put(`${base}cart/${version}/cart/saved-item/send-to-cart`, {}, config);
        return res;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/cart'`, error.message);
        return error.code;
      }
    },
    createCart: async (): Promise<{ visitId: string }> => {
      try {
        const res = await axios.post(`${base}cart/${version}/cart/visit`, {}, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/cart'`, error.message);
        return error.message;
      }
    },
    getUserCart: async (currency = 'MUR') => {
      try {
        const res = await axios.get(`${base}cart/${version}/cart/visit/user`, { ...config, params: { currency } });
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/cart'`, error.message);
        return error.code;
      }
    },
    getSavedItems: async (currency = 'MUR') => {
      try {
        const res = await axios.get(`${base}cart/${version}/cart/saved-item`, { ...config, params: { currency } });
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/cart'`, error.message);
        return error.code;
      }
    },

    removeSavedItem: async (itemId: string) => {
      try {
        const res = await axios.delete(`${base}cart/${version}/cart/saved-item/${itemId}`, config);
        return res
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/cart'`, error.message);
        return error.code;
      }
    },
  };
};

