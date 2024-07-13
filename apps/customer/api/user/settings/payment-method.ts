/**
 * File: payment-method.ts
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 21 September 2022, 12:44
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { authHeader } from 'api';
import { Axios } from 'axios';
import { Pagination, PaymentGateway } from 'models';

/* eslint-disable import/no-anonymous-default-export */
export default (axios: Axios, base: string) => {
  const config = {
    headers: authHeader,
  };
  return {
    getPaymentMethods: async (payload: Pagination = new Pagination({pageSize: 10000})): Promise<PaymentGateway[]> => {
      try {
        const res = await axios.get(`${base}/payment`, { ...config, params: payload });
        return res?.data?.paymentGatewayResponses;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/user/settings'`, error.message);
        return error.response;
      }
    },
    updatePaymentMethod: async (preferredPaymentGatewayCode: string): Promise<any> => {
      try {
        const res = await axios.put(`${base}/payment`, { preferredPaymentGatewayCode, preferredPaymentMethodId: null }, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/user/settings'`, error.message);
        return error.response;
      }
    },
    // removePaymentMethod: async (paymentMethodId: string): Promise<any> => {
    //   try {
    //     const res = await axios.delete(`${base}/payment`, {...config, data: {paymentMethodId}});
    //     return res.data;
    //   } catch (error) {
    //     console.error(`🚀 ${error.name} in 'api/user/settings'`, error.message);
    //     return error.response;
    //   }
    // },
  };
};
