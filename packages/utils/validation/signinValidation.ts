/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 16 March 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { SigninData, SigninDataErrors } from "./types"

// Messages
const required = "This field is required";
const maxLength = "Your input exceed maximum length";
const minLength = "You should be older than 18"


const validateUsername = (values: SigninData) => {
  const errors: SigninDataErrors = {};
  if (!values.username) {
    errors.username = required;
  } else if (values.username.length > 12) {
    errors.username = maxLength;
  }
  return errors;
};

const validatePassword = (values: SigninData) => {
  const errors: SigninDataErrors = {};
  if (!values.password) {
    errors.password = required;
  }
  return errors;
};

export default [validateUsername, validatePassword]
