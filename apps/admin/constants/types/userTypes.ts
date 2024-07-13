/*
 * File: types.ts
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 06 April 2022 11:57 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

export default interface UserDataType {
    employeeId: string;
    email: string;
    firstName: string;
    lastName: string;
    designation: string;
    active: boolean;
    role: [];
}