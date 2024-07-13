/**
 * File: user.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: 23 September 2022, 12:11
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

const payloadEn = {
    companyName: '',
    businessRegNumber: '',
    companyAddress: '',
    country: 'Mauritius',
    firstName: '',
    lastName: '',
    idPassport: '',
    designation: '',
    email: '',
    countryCode: '+230',
    mobileNumber: '',
    additionalFirstName: '',
    additionalLastName: '',
    additionalIdPassport: '',
    additionalDesignation: '',
    additionalEmail: '',
    additionalMobileNumberCountryCode: '+230',
    additionalMobileNumber: '',
    idPassportFile: '',
    addressProof: '',
    businessRegCertificate: '',
    VAT: '',
    incorporation: '',
};
const payloadIn = {
    firstName: '',
    lastName: '',
    idPassport: '',
    address1: '',
    address2: '',
    email: '',
    mobileNumber: '',
    idPassportFileIn: '',
    addressProofIn: '',
};
const payloads = {
    payloadEn, payloadIn
};
export default payloads