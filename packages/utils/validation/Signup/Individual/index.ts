/*
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 16 March 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import IndividualUserData, { Errors, IndividualUserDataErrors } from "../../types"

const validateFirstName = (values: IndividualUserData) => {
  const errors: IndividualUserDataErrors = {};
  if (!values.firstName) {
    errors.firstName = Errors.required;
  } else if (values.firstName.length > 250) {
    errors.firstName = Errors.maxLength;
  }
  return errors;
};

const validateLastName = (values: IndividualUserData) => {
  const errors: IndividualUserDataErrors = {};
  if (!values.lastName) {
    errors.lastName = Errors.required;
  } else if (values.lastName.length > 250) {
    errors.lastName = Errors.maxLength;
  }
  return errors;
};

const validateIDPassort = (values: IndividualUserData) => {
  const errors: IndividualUserDataErrors = {};
  if (!values.idPassport) {
    errors.idPassport = Errors.required;
  } else if (values.idPassport.length > 50) {
    errors.idPassport = Errors.maxLength;
  }
  return errors;
};

const validateAddress1 = (values: IndividualUserData) => {
  const errors: IndividualUserDataErrors = {};
  if (!values.address1) {
    errors.address1 = Errors.required;
  } else if (values.address1.length > 250) {
    errors.address1 = Errors.maxLength;
  }
  return errors;
};

const validateAddress2 = (values: IndividualUserData) => {
  const errors: IndividualUserDataErrors = {};
  if (!values.address2) {
    errors.address2 = Errors.required;
  } else if (values.address2.length > 250) {
    errors.address2 = Errors.maxLength;
  }
  return errors;
};

export const validateEmail = (email: string) => {
  let errors: string = '';
  if (!email) {
    errors = Errors.required;
  } else if (!/^(([^<>()[\]\\.,;:-\s@\"]+(\.[^<>()[\]\\.,;:-\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(email)) {
    errors = Errors.invalidEmail;
  }

  return errors;
};

const validateMobileNumber = (values: IndividualUserData) => {
  const errors: IndividualUserDataErrors = {};
  if (!values.mobileNumber) {
    errors.mobileNumber = Errors.required;
  } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3,11}[-\s\.]?[0-9]{4,9}$/im.test('+230'.concat(values.mobileNumber))) {
    errors.mobileNumber = Errors.invalidPhoneNumber
  }
  else if (values.mobileNumber.length > 15) {
    errors.mobileNumber = Errors.maxLength;
  }
  return errors;
};

const validateIDPassortUpload = (values: IndividualUserData) => {
  const errors: IndividualUserDataErrors = {};
  if (!values.idPassportFileIn) {
    errors.idPassportFileIn = Errors.required;
  } else if (!fileTypeValidation(values.idPassportFileIn)) {
    errors.idPassportFileIn = Errors.invalidFileType;
  }
  else if (fileSizeValidation(values.idPassportFileIn) >= 7) {
    errors.idPassportFileIn = Errors.maxSize;
  }
  return errors;
};

const validateAddressProof = (values: IndividualUserData) => {
  const errors: IndividualUserDataErrors = {};
  if (!values.addressProofIn) {
    errors.addressProofIn = Errors.required;
  } else if (!fileTypeValidation(values.addressProofIn)) {
    errors.addressProofIn = Errors.invalidFileType;
  }
  else if (fileSizeValidation(values.addressProofIn) >= 7) {
    errors.addressProofIn = Errors.maxSize;
  }
  return errors;
};

const fileSizeValidation = (file: string) => {
  var applyPaddingsRules = true;
  var length = file.includes("base64,") ? file.split(',')[1].length : file.length
  var fileSizeInByte = Math.ceil(length / 4) * 3;

  if (applyPaddingsRules && file.length >= 2) {

    fileSizeInByte = file.endsWith("==") ? fileSizeInByte - 2 : file[1] === ("=") ? fileSizeInByte - 1 : fileSizeInByte;
    return fileSizeInByte / (1024 * 1024);
  }
  return 0;
}

const fileTypeValidation = (file: string) => {
  const type = file.split(';')[0].split('/')[1];

  if (type === 'jpeg' || type === 'jpg' || type === 'png' || type === 'pdf') {
    return true
  }
  return false
}


export default [validateFirstName, validateLastName, validateIDPassort, validateAddress1, validateAddress2, validateMobileNumber, validateIDPassortUpload, validateAddressProof]
