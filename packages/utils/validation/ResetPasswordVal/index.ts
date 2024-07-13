/*
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 04 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { ResetPasswordDataErrors, ResetPasswordData, Errors } from "../types"


const validatePassword = (values: ResetPasswordData) => {
    const errors: ResetPasswordDataErrors = {};
    errors.password = []
    if (!values.password) {
        errors.password.push(Errors.required);
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

// const validateConfirmPassword = (values: ResetPasswordData) => {
//     const errors: ResetPasswordDataErrors = {};
//     if (values.confirmPassword !== values.password) {
//         errors.confirmPassword = Errors.confirmPasswordError;
//     }
//     return errors;
// };

export default [validatePassword,]
