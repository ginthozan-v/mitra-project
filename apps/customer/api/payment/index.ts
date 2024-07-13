/**
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 05 September 2022, 13:33
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { authHeader } from 'api';
import { Axios } from 'axios';
import { PAYMENT_GATEWAY } from 'models';

export default (axios: Axios, base: string) => {
  const config = {
    headers: authHeader,
  };

  return {
    // [GET] /payments/uniqueId/{uniqueId}
    // [GET] /payments/cartId/{cartId}
    // [POST] /payments/mytmoney/payment-return
    // [GET] /payments/mytmoney/payment-notify

    // [POST] /payments/mytmoney/initiate-payment & [POST] /payments/ipay/initiate-payment
    initiatePayment: async (
      payload: {
        cartId: string;
        amount: number;
        currencyCode: string;
        langCode: string;
        remark?: string;
      },
      paymentMethod: string,
    ): Promise<any> => {
      try {
        let url = `${base}/mytmoney/initiate-payment`;
        if (paymentMethod == PAYMENT_GATEWAY.SBM) {
          url = `${base}/ipay/initiate-payment`;
        }
        const res = await axios.post(url, payload, config);
        return res;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/cart'`, error.message);
        return error;
      }
    },

    // [GET] /payments/uniqueId/{uniqueId} & [GET] /payments/ipay/state-check/{orderId}
    checkStatus: async (paymentId: string, paymentMethod: string): Promise<any> => {
      try {
        let res,
          url = `${base}/uniqueId/${paymentId}`;
        if (paymentMethod == PAYMENT_GATEWAY.SBM) {
          url = `${base}/ipay/state-check/${paymentId}`;
        }
        res = await axios.get(url, config);
        return res;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/cart'`, error.message);
        return error.response.data;
      }
    },
  };
};
