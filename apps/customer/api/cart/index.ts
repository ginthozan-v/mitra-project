/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: Monday, 26 July 2022 01:35 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { authHeader } from 'api';
import { Axios, AxiosResponse } from 'axios';
import { BillingDetail, Cart, CartItem, PaymentDetail } from 'models';


// [DELETE] /cart/visit/{visitId} [NOT NEEDED]


export default (axios: Axios, base: string) => {
  const config = {
    headers: authHeader,
  };

  return {
    // [POST] /cart/visit
    createCart: async (): Promise<{ visitId: string }> => {
      try {
        const res = await axios.post(`${base}/visit`, {}, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api.cart.createCart'`, error.message);
        return error.response.data;
      }
    },
    // [GET] /cart/visit/{visitId}
    getCart: async (visitId: string): Promise<Cart | any> => {
      try {
        const res = await axios.get(`${base}/visit/${visitId}`, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api.cart.getCart'`, error.message);
        return error.response.data;
      }
    },
    // [GET] /cart/visit/user
    getUserCart: async (currency = 'MUR'): Promise<Cart> => {
      try {
        const res = await axios.get(`${base}/visit/user`, { ...config, params: { currency } });
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api.cart.getUserCart'`, error.message);
        return error.response.data;
      }
    },
    // [PUT] /cart/visit/{visitId}/user
    updateCartOwner: async (visitId: string): Promise<AxiosResponse> => {
      try {
        const res = await axios.put(`${base}/visit/${visitId}/user`, {}, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api.cart.updateCartOwner'`, error.message);
        return error.response.data;
      }
    },
    // [PUT] /cart/{visitId}/reprice
    repriceCart: async (visitId: string): Promise<Cart> => {
      try {
        const res = await axios.put(`${base}/${visitId}/reprice`, {}, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api.cart.repriceCart'`, error.message);
        return error.response.data;
      }
    },
    // [PATCH] /cart/visit/{visitId}/LOCK
    lockCart: async (visitId: string, lock: boolean) => {
      try {
        const res = await axios.patch(`${base}/visit/${visitId}/lock?isLocked=${lock}`, {}, config);
        return res;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api.cart.lockCart'`, error.message);
        return error.message;
      }
    },
    // [PATCH] /cart/{visitId}/payment
    updatePayment: async (visitId: string, payload: PaymentDetail) => {
      try {
        const res = await axios.patch(`${base}/${visitId}/payment`, payload, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api.cart.updatePayment'`, error.message);
        return error.response.data;
      }
    },
    // [PATCH] /cart/{visitId}/billing
    updateBilling: async (visitId: string, payload: BillingDetail) => {
      try {
        const res = await axios.patch(`${base}/${visitId}/billing`, payload, config);
        return res;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api.cart.updateBilling'`, error.message);
        return error.response.data;
      }
    },
    // [POST] /cart/{visitId}/checkout
    checkoutCart: async (visitId: string): Promise<any> => {
      try {
        const res = await axios.post(`${base}/${visitId}/checkout`, {}, config);
        return res;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api.cart.checkoutCart'`, error.message);
        return error.response.data;
      }
    },
    // [POST] /cart/{visitId}/item
    addToCart: async (visitId: string, payload: CartItem): Promise<any> => {
      try {
        const res = await axios.post(`${base}/${visitId}/item`, payload, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api.cart.addToCart'`, error.message);
        return error.response.data;
      }
    },
    // [POST] /cart/{visitId}/item
    addToSavedItems: async (payload): Promise<any> => {
      try {
        const res = await axios.post(`${base}/saved-item`, payload, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api.cart.addToCart'`, error.message);
        return error.response.data;
      }
    },
    // [PUT] /cart/{visitId}/item/{itemId}
    updateCartItem: async (visitId: string, itemId: number, payload: CartItem): Promise<any> => {
      try {
        const res = await axios.put(`${base}/${visitId}/item/${itemId}`, payload, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api.cart.updateCartItem'`, error.message);
        return error;
      }
    },
    // [DELETE] /cart/{visitId}/item/{itemId}
    removeCartItem: async (visitId: string, itemId: number): Promise<any> => {
      try {
        const res = await axios.delete(`${base}/${visitId}/item/${itemId}`, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api.cart.removeCartItem'`, error.message);
        return error;
      }
    },
    //[GET] //cart/{visitId}/credit-note
    getCreditNote: async (visitId: string, currency: string) => {
      try {
        const res = await axios.get(`${base}/${visitId}/credit-note`, { ...config, params: { currency } });
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api.cart.getCreditNote'`, error.message);
        return error.response.data;
      }
    },
    //[POST] /cart/{visitId}/billing/clear
    clearCreditNote: async (visitId: string) => {
      try {
        const res = await axios.post(`${base}/${visitId}/billing/clear`, {}, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api.cart.clearCreditNote'`, error.message);
        return error.response.data;
      }
    },
  };
};

//#region Type Definitions
//#endregion
