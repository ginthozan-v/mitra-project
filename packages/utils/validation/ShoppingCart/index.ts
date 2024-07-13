/*
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 15 June 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import {
  Errors,
  BillingModeDataErrors,
  PaymentData,
  PaymentDataErrors,
} from '../types';

type BillingDetail = { isBillingTCAgreed: boolean; billingMode: string };

const validateBillingMode = (values: BillingDetail) => {
  const errors: BillingModeDataErrors = {};
  if (!values.billingMode) {
    errors.billingMode = Errors.required;
  }
  return errors;
};

const validatePrivacy = (values: BillingDetail) => {
  const errors: BillingModeDataErrors = {};
  if (!values.isBillingTCAgreed) {
    errors.privacy = Errors.required;
  }
  return errors;
};

export const validatePayment = (values: PaymentData) => {
  const errors: PaymentDataErrors = {};
  if (!values.gateway) {
    errors.gateway = Errors.required;
  }
  return errors;
};

export default [validateBillingMode, validatePrivacy];
