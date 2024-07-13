/*
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 04 May 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { Errors, PostPaidData, PostPaidDataErrors } from '../types';

const validateRequiredAny = (values: PostPaidData) => {
  const errors: PostPaidDataErrors = {};
  if (!values.fixedLine && !values.billingAccount) {
    errors.fixedLine = ' ';
    errors.billingAccount = 'At least one of the above is required.';
  }
  return errors;
};

const validateFixedLine = (values: PostPaidData) => {
  const errors: PostPaidDataErrors = {};
  if (values.fixedLine) {
    if (
      isNaN(Number(values.fixedLine)) ||
      isNaN(parseInt(values.fixedLine)) ||
      parseInt(values.fixedLine) !== Number(values.fixedLine) ||
      values.fixedLine.indexOf('.') !== -1
    ) {
        errors.fixedLine = 'Only number is allowed.';
    } else if (values.fixedLine.length > 15) {
        // errors.fixedLine = Errors.maxLength;
        errors.fixedLine = 'Fixed line number can be upto 15 digits.';
    }
  }
  return errors;
};

const validateBillingAccountNumber = (values: PostPaidData) => {
  const errors: PostPaidDataErrors = {};
  if (values.billingAccount) {
    if (
      isNaN(Number(values.billingAccount)) ||
      isNaN(parseInt(values.billingAccount)) ||
      parseInt(values.billingAccount) !== Number(values.billingAccount) ||
      values.billingAccount.indexOf('.') !== -1
    ) {
        errors.billingAccount = 'Only number is allowed.';
    } else if (values.billingAccount && values.billingAccount.length > 15) {
        // errors.billingAccount = Errors.maxLength;
        errors.billingAccount = 'Billing account number can be upto 15 digits.';
    }
  }
  return errors;
};

export default [validateRequiredAny, validateFixedLine, validateBillingAccountNumber];
