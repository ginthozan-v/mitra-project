/**
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 18 August 2022, 13:05
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

export type PaymentMethods = {
  paymentMethodResponseList: PaymentMethodResponseList[];
  pageNo: number;
  pageSize: number;
  resultsCount: number;
  totalResults: number;
};

export type PaymentMethodResponseList = {
  gatewayId: string;
  maskedCardNumber: string;
  preferred: boolean;
  image: string;
  userId: string;
};

export type PaymentMethod = {
  externalToken: string;
  gatewayId: string;
  maskedCardNumber: string;
  status: string;
};
