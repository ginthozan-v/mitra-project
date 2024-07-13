/*
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 09 May 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { Errors, SupportTicket, SupportTicketErrors } from '../types';

const validateSupportCategory = (values: SupportTicket) => {
  const errors: SupportTicketErrors = {};
  if (!values.supportCategory) {
    errors.supportCategory = Errors.required;
  }
  return errors;
};
const validateSupportSubCategory = (values: SupportTicket) => {
  const errors: SupportTicketErrors = {};
  if (!values.supportSubCategory) {
    errors.supportSubCategory = Errors.required;
  }
  return errors;
};
const validatePhoneNumber = (values: SupportTicket) => {
  const errors: SupportTicketErrors = {};
  if (!values.phoneNumber) {
    errors.phoneNumber = Errors.required;
  } else if (
    !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3,11}[-\s\.]?[0-9]{4,9}$/im.test(values.phoneNumber)
  ) {
    errors.phoneNumber = Errors.invalidPhoneNumber;
  } else if (values.phoneNumber.length > 15) {
    errors.phoneNumber = Errors.maxLength;
  }
  return errors;
};
const validateSupportMessage = (values: SupportTicket) => {
  const errors: SupportTicketErrors = {};
  if (!values.description) {
    errors.description = Errors.required;
  } else if (values.description.length > 250) {
    errors.description = Errors.maxLength;
  }
  return errors;
};

export default [
  validateSupportCategory,
  validateSupportSubCategory,
  validatePhoneNumber,
  validateSupportMessage,
];
