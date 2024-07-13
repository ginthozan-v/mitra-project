/*
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Tuesday, 26 April 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { EnterpriseUpdateUserData, Errors, EnterpriseUpdateUserDataErrors } from "../../types"

const validateCompanyName = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};
    if (!values.companyName) {
        errors.companyName = Errors.required;
    } else if (values.companyName.length > 50) {
        errors.companyName = Errors.maxLength;
    }
    return errors;
};

const validateBusinessRegNumber = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};
    if (!values.businessRegNumber) {
        errors.businessRegNumber = Errors.required;
    } else if (values.businessRegNumber.length > 50) {
        errors.businessRegNumber = Errors.maxLength;
    }
    return errors;
};

const validateCompanyAddress = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};
    if (!values.companyAddress) {
        errors.companyAddress = Errors.required;
    } else if (values.companyAddress.length > 250) {
        errors.companyAddress = Errors.maxLength;
    }
    return errors;
};

const validateCountry = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};
    if (!values.countryUp) {
        errors.countryUp = Errors.required;
    }
    return errors;
};

const validateFirstName = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};
    if (!values.firstName) {
        errors.firstName = Errors.required;
    } else if (values.firstName.length > 250) {
        errors.firstName = Errors.maxLength;
    }
    return errors;
};

const validateLastName = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};
    if (!values.lastName) {
        errors.lastName = Errors.required;
    } else if (values.lastName.length > 250) {
        errors.lastName = Errors.maxLength;
    }
    return errors;
};

const validateIDPassort = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};
    if (!values.idPassport) {
        errors.idPassport = Errors.required;
    } else if (values.idPassport.length > 50) {
        errors.idPassport = Errors.maxLength;
    }
    return errors;
};

const validateDesignation = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};
    if (!values.designation) {
        errors.designation = Errors.required;
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

const validateMobileNumber = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};
    if (!values.mobileNumber || !values.countryCode) {
        errors.mobileNumber = Errors.required;
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3,11}[-\s\.]?[0-9]{4,9}$/im.test(values.countryCode.concat(values.mobileNumber))) {
        errors.mobileNumber = Errors.invalidPhoneNumber
    }
    else if (values.mobileNumber.length > 15) {
        errors.mobileNumber = Errors.maxLength;
    }
    return errors;
};

const validateIDPassortUpload = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};
    if (!values.idPassportFile) {
        errors.idPassportFile = Errors.required;
    } else if (values.idPassportFile && !fileTypeValidation(values.idPassportFile)) {
        errors.idPassportFile = Errors.invalidFileType;
    } else if (fileSizeValidation(values.idPassportFile) >= 7) {
        errors.idPassportFile = Errors.maxSize;
    }
    return errors;
};

const validateAddressProof = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};
    if (!values.addressProof) {
        errors.addressProof = Errors.required;
    } else if (!fileTypeValidation(values.addressProof)) {
        errors.addressProof = Errors.invalidFileType;
    } else if (fileSizeValidation(values.addressProof) >= 7) {
        errors.addressProof = Errors.maxSize;
    }
    return errors;
};

const validateBusinessRegCertificate = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};
    if (!values.businessRegCertificate) {
        errors.businessRegCertificate = Errors.required;
    } else if (!fileTypeValidation(values.businessRegCertificate)) {
        errors.businessRegCertificate = Errors.invalidFileType;
    } else if (fileSizeValidation(values.businessRegCertificate) >= 7) {
        errors.businessRegCertificate = Errors.maxSize;
    }
    return errors;
};

const validateVAT = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};
    if (values.VAT && fileSizeValidation(values.VAT) >= 7) {
        errors.VAT = Errors.maxSize;
    } else if (values.VAT && !fileTypeValidation(values.VAT)) {
        errors.VAT = Errors.invalidFileType;
    }
    return errors;
};

const validateIncorporation = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};
    if (values.incorporation && fileSizeValidation(values.incorporation) >= 7) {
        errors.incorporation = Errors.maxSize;
    } else if (values.incorporation && !fileTypeValidation(values.incorporation)) {
        errors.incorporation = Errors.invalidFileType;
    }
    return errors;
};

const validateAdditionalFirstName = (values: EnterpriseUpdateUserData) => {

    const errors: EnterpriseUpdateUserDataErrors = {};
    if (values.additionalFirstName && values.additionalFirstName.length > 250) {
        errors.additionalFirstName = Errors.maxLength;
    }
    return errors;
};

const validateAdditionalLastName = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};
    if (values.additionalLastName && values.additionalLastName.length > 250) {
        errors.additionalLastName = Errors.maxLength;
    }
    return errors;
};
const validateAdditionalIDPassort = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};
    if (values.additionalIdPassport && !/^[a-z0-9]+$/i.test(values.additionalIdPassport)) {
        errors.additionalIdPassport = Errors.alphaNumeric;
    } else if (values.additionalIdPassport && values.additionalIdPassport.length > 50) {
        errors.additionalIdPassport = Errors.maxLength;
    }
    return errors;
};

const validateAdditionalEmail = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};

    if (values.additionalEmail && (!/^(([^<>()[\]\\.,;:-\s@\"]+(\.[^<>()[\]\\.,;:-\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values.additionalEmail))) {
        errors.additionalEmail = Errors.invalidEmail;
    }
    return errors;
};
const validateAdditionalMobileNumber = (values: EnterpriseUpdateUserData) => {
    const errors: EnterpriseUpdateUserDataErrors = {};
    if (values.additionalMobileNumber && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3,11}[-\s\.]?[0-9]{4,9}$/im.test(values.additionalMobileNumberCountryCode.concat(values.additionalMobileNumber))) {
        errors.additionalMobileNumber = Errors.invalidPhoneNumber
    } else if (values.additionalMobileNumber && values.additionalMobileNumber.length > 15) {
        errors.additionalMobileNumber = Errors.maxLength;
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


export default [validateCompanyName, validateBusinessRegNumber, validateCompanyAddress, validateCountry, validateFirstName, validateLastName, validateIDPassort, validateMobileNumber, validateDesignation, validateIDPassortUpload, validateAddressProof, validateBusinessRegCertificate, validateAdditionalFirstName, validateAdditionalLastName, validateAdditionalIDPassort, validateAdditionalEmail, validateAdditionalMobileNumber, validateVAT, validateIncorporation]
