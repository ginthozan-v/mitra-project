/*
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 04 April 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { ContactUsData, Errors, ContactUsDataErrors } from '../types';

const validateFullName = (values: ContactUsData) => {
  const errors: ContactUsDataErrors = {};
  if (!values.fullName) {
    errors.fullName = 'Please enter your full name here.';
  } else if (values.fullName.length > 250) {
    errors.fullName = Errors.maxLength;
  }
  return errors;
};

const validateCompanyName = (values: ContactUsData) => {
  const errors: ContactUsDataErrors = {};
  if (values.companyName.length > 50) {
    errors.companyName = Errors.maxLength;
  }
  return errors;
};

const validateJobTitle = (values: ContactUsData) => {
  const errors: ContactUsDataErrors = {};
  if (values.jobTitle.length > 50) {
    errors.jobTitle = Errors.alphaNumeric;
  }
  return errors;
};

const validateCategory = (values: ContactUsData) => {
  const errors: ContactUsDataErrors = {};
  if (!values.supportCategoryId) {
    errors.supportCategoryId = Errors.required;
  }
  return errors;
};

const validateSubCategory = (values: ContactUsData) => {
  const errors: ContactUsDataErrors = {};
  if (!values.supportSubcategoryId) {
    errors.supportSubcategoryId = Errors.required;
  }
  return errors;
};

const validateEmail = (values: ContactUsData) => {
  const errors: ContactUsDataErrors = {};
  if (!values.email) {
    errors.email = Errors.required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  return errors;
};

const validateSubject = (values: ContactUsData) => {
  const errors: ContactUsDataErrors = {};
  if (!values.subject) {
    errors.subject = 'Please add a subject to your query.';
  }
  return errors;
};

const validateContactNumber = (values: ContactUsData) => {
  const errors: ContactUsDataErrors = {};
  if (
    values.contactNumber &&
    !/^[-\s\.]?[0-9]{3,11}[-\s\.]?[0-9]{4,9}$/im.test(values.contactNumber)
  ) {
    errors.contactNumber = Errors.invalidPhoneNumber;
  } else if (values.contactNumber.length > 15) {
    errors.contactNumber = Errors.maxLength;
  }
  return errors;
};

export default [
  validateFullName,
  validateCompanyName,
  validateJobTitle,
  validateCategory,
  validateSubCategory,
  validateEmail,
  validateSubject,
  validateContactNumber,
];
