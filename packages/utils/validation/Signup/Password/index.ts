/*
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 23 March 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { PasswordData, PasswordDataErrors, Errors } from "../../types"


const validatePassword = (values: PasswordData) => {
  const errors: PasswordDataErrors = {};
  errors.password = []
  if (!values.password) {
    errors.password.push(Errors.required);
  } else if (values.password.length > 24) {
    errors.password.push(Errors.maxLength);
  }
  if (!/(.*\W.*)/.test(values.password)) {
    errors.password.push(Errors.specialCharacter);
  }
  if (!/(.*\d.*)/.test(values.password)) {
    errors.password.push(Errors.digit);
  }
  if (!/[A-Z]/.test(values.password)) {
    errors.password.push(Errors.uppercase);
  }
  if (!/.{8,}/.test(values.password)) {
    errors.password.push(Errors.size);
  }
  return errors;
};

const validateConfirmPassword = (values: PasswordData) => {
  const errors: PasswordDataErrors = {};
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = Errors.confirmPasswordError;
  } else if (values.password.length > 24) {
    errors.confirmPassword = Errors.maxLength;
  }
  return errors;
};

const validatePrivacy = (values: PasswordData) => {
  const errors: PasswordDataErrors = {};
  if (!values.privacy) {
    errors.privacy = Errors.required;
  }
  return errors;
};

export default [validatePassword, validateConfirmPassword, validatePrivacy]
