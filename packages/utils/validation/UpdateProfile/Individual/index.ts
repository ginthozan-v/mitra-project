/*
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 25 April 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { IndividualUpdateUserData, Errors, IndividualUpdateUserDataErrors } from "../../types"

const validateFirstName = (values: IndividualUpdateUserData) => {
  const errors: IndividualUpdateUserDataErrors = {};
  if (!values.firstName) {
    errors.firstName = Errors.required;
  } else if (values.firstName.length > 250) {
    errors.firstName = Errors.maxLength;
  }
  return errors;
};

const validateLastName = (values: IndividualUpdateUserData) => {
  const errors: IndividualUpdateUserDataErrors = {};
  if (!values.lastName) {
    errors.lastName = Errors.required;
  } else if (values.lastName.length > 250) {
    errors.lastName = Errors.maxLength;
  }
  return errors;
};
const validateIDPassort = (values: IndividualUpdateUserData) => {
  const errors: IndividualUpdateUserDataErrors = {};
  if (!values.idPassport) {
    errors.idPassport = Errors.required;
  } else if (values.idPassport.length > 50) {
    errors.idPassport = Errors.maxLength;
  }
  return errors;
};

const validateAddress1 = (values: IndividualUpdateUserData) => {
  const errors: IndividualUpdateUserDataErrors = {};
  if (!values.address1) {
    errors.address1 = Errors.required;
  } else if (values.address1.length > 250) {
    errors.address1 = Errors.maxLength;
  }
  return errors;
};

const validateAddress2 = (values: IndividualUpdateUserData) => {
  const errors: IndividualUpdateUserDataErrors = {};
  if (!values.address2) {
    errors.address2 = Errors.required;
  } else if (values.address2.length > 250) {
    errors.address2 = Errors.maxLength;
  }
  return errors;
};

const validateEmail = (values: IndividualUpdateUserData) => {
  const errors: IndividualUpdateUserDataErrors = {};
  if (!values.email) {
    errors.email = Errors.required;
  } else if (!/^(([^<>()[\]\\.,;:-\s@\"]+(\.[^<>()[\]\\.,;:-\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values.email)) {
    errors.email = Errors.invalidEmail;
  }
  return errors;
};

const validateMobileNumber = (values: IndividualUpdateUserData) => {
  const errors: IndividualUpdateUserDataErrors = {};
  if (!values.mobileNumber) {
    errors.mobileNumber = Errors.required;
  } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3,11}[-\s\.]?[0-9]{4,9}$/im.test('+230'.concat(values.mobileNumber))) {
    errors.mobileNumber = Errors.invalidPhoneNumber
  } else if (values.mobileNumber.length > 15) {
    errors.mobileNumber = Errors.maxLength;
  }
  return errors;
};

const validateIDPassortUpload = (values: IndividualUpdateUserData) => {
  const errors: IndividualUpdateUserDataErrors = {};
  if (!values.idPassportFile) {
    errors.idPassportFile = Errors.required;
  } else if (!fileTypeValidation(values.idPassportFile)) {
    errors.idPassportFile = Errors.invalidFileType;
  }
  else if (fileSizeValidation(values.idPassportFile) >= 7) {
    errors.idPassportFile = Errors.maxSize;
  }
  return errors;
};

const validateAddressProof = (values: IndividualUpdateUserData) => {
  const errors: IndividualUpdateUserDataErrors = {};
  if (!values.addressProof) {
    errors.addressProof = Errors.required;
  } else if (!fileTypeValidation(values.addressProof)) {
    errors.addressProof = Errors.invalidFileType;
  }
  else if (fileSizeValidation(values.addressProof) >= 7) {
    errors.addressProof = Errors.maxSize;
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


export default [validateFirstName, validateLastName, validateIDPassort, validateAddress1, validateAddress2, validateEmail, validateMobileNumber, validateIDPassortUpload, validateAddressProof]
