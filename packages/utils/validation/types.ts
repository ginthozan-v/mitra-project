/*
 * File: types.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 16 March 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

export default interface IndividualUserData {
  firstName: string;
  lastName: string;
  idPassport: string;
  address1: string;
  address2: string;
  email: string;
  mobileNumber: string;
  idPassportFileIn: string;
  addressProofIn: string;
}
export interface IndividualUserDataErrors {
  firstName?: string;
  lastName?: string;
  idPassport?: string;
  address1?: string;
  address2?: string;
  email?: string;
  mobileNumber?: string;
  idPassportFileIn?: string;
  addressProofIn?: string;
}

export interface EnterpriseUserData {
  companyName: string;
  businessRegNumber: string;
  companyAddress: string;
  country: string;
  firstName: string;
  lastName: string;
  idPassport: string;
  designation: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  additionalFirstName: string;
  additionalLastName: string;
  additionalMobileNumberCountryCode: string;
  additionalIdPassport: string;
  additionalDesignation: string;
  additionalEmail: string;
  additionalMobileNumber: string;
  idPassportFile: string;
  addressProof: string;
  businessRegCertificate: string;
  VAT: string;
  incorporation: string;
}
export interface EnterpriseUserDataErrors {
  companyName?: string;
  businessRegNumber?: string;
  companyAddress?: string;
  country?: string;
  firstName?: string;
  lastName?: string;
  idPassport?: string;
  designation?: string;
  email?: string;
  countryCode?: string;
  mobileNumber?: string;
  additionalFirstName?: string;
  additionalLastName?: string;
  additionalIdPassport?: string;
  additionalDesignation?: string;
  additionalEmail?: string;
  additionalMobileNumber?: string;
  idPassportFile?: string;
  addressProof?: string;
  businessRegCertificate?: string;
  VAT?: string;
  incorporation?: string;
}
export interface SigninData {
  username: string;
  password: string;
}
export interface SigninDataErrors {
  username?: string;
  password?: string;
}
export interface PasswordData {
  password: string;
  confirmPassword: string;
  privacy: boolean;
  newsLetter: boolean;
}
export interface PasswordDataErrors {
  password?: string[];
  confirmPassword?: string;
  privacy?: string;
}

export interface ResetPasswordData {
  oldPassword: string;
  password: string;
}
export interface ResetPasswordDataErrors {
  oldPassword?: string;
  password?: string[];
}

export interface IndividualUpdateUserData {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  idPassport: string
  email: string;
  mobileNumber: string;
  idPassportFile: string;
  addressProof: string;
}
export interface IndividualUpdateUserDataErrors {
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  idPassport?: string
  email?: string;
  mobileNumber?: string;
  idPassportFile?: string;
  addressProof?: string;
}

export interface EnterpriseUpdateUserData {
  companyName: string,
  businessRegNumber: string,
  companyAddress: string,
  countryUp: string,
  firstName: string,
  lastName: string,
  idPassport: string,
  designation: string,
  email: string,
  countryCode: string,
  mobileNumber: string,
  additionalFirstName: string,
  additionalLastName: string,
  additionalMobileNumberCountryCode: string,
  additionalIdPassport: string,
  additionalDesignation: string,
  additionalEmail: string,
  additionalMobileNumber: string,
  idPassportFile: string,
  addressProof: string,
  businessRegCertificate: string,
  VAT: string,
  incorporation: string
}
export interface EnterpriseUpdateUserDataErrors {
  companyName?: string,
  businessRegNumber?: string,
  companyAddress?: string,
  countryUp?: string,
  firstName?: string,
  lastName?: string,
  idPassport?: string,
  designation?: string,
  email?: string,
  countryCode?: string,
  mobileNumber?: string,
  additionalFirstName?: string,
  additionalLastName?: string,
  additionalIdPassport?: string,
  additionalDesignation?: string,
  additionalEmail?: string,
  additionalMobileNumber?: string,
  idPassportFile?: string,
  addressProof?: string,
  businessRegCertificate?: string,
  VAT?: string,
  incorporation?: string
}


export interface PostPaidData {
  fixedLine: string;
  billingAccount: string;
}
export interface PostPaidDataErrors {
  fixedLine?: string;
  billingAccount?: string;
}

export interface SupportTicket {
  supportCategory: string;
  supportSubCategory: string;
  phoneNumber: string;
  description: string;
  emailRequired: boolean;
}
export interface SupportTicketErrors {
  supportCategory?: string;
  supportSubCategory?: string;
  phoneNumber?: string;
  description?: string;
}

export interface ContactUsData {
  fullName: string;
  companyName: string;
  jobTitle: string;
  countryName: string;
  contactNumber: string;
  email: string;
  supportCategoryId: string;
  supportSubcategoryId: string;
  subject: string;
  message: string;
}
export interface ContactUsDataErrors {
  fullName?: string;
  companyName?: string;
  jobTitle?: string;
  contactNumber?: string;
  email?: string;
  supportCategoryId?: string;
  supportSubcategoryId?: string;
  subject?: string;
  message?: string;
}

export interface SearchData {
  searchKey: string;
}

export interface BillingModeData {
  billingMode: string;
  privacy: boolean;
}
export interface BillingModeDataErrors {
  billingMode?: string;
  privacy?: string;
}

export interface PaymentData {
  gateway: string;
}
export interface PaymentDataErrors {
  gateway?: string;
}

export enum Errors {
  required = 'This field is required',
  specialCharacter = 'Must contain at least one special character',
  digit = 'Must contain at least one number',
  uppercase = 'Must contain at least one upper case character',
  size = 'Must be at least eight characters long',
  success = 'Success',
  maxLength = 'Your input exceed maximum length',
  maxSize = 'File exceed maximum file size, should be less than 7MB',
  invalidEmail = 'Please enter a valid email address.',
  invalidPhoneNumber = 'Please enter a valid mobile number.',
  confirmPasswordError = 'Please make sure your passwords match.',
  alphaNumeric = 'Only alphnumeric characters are allowed',
  invalidFileType = 'Invalid file type, Only allowed jpg,png and pdf',
}
