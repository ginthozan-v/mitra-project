/*
 * File: menuItems.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 09 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { ROUTE_SETTINGS, ROUTE_SETTINGS_SECURITY, ROUTE_SETTINGS_POSTPAID, ROUTE_SETTINGS_PAYMENT } from "constants/routes";

const menuItems = [
    { title: 'General', id: 'general', path: ROUTE_SETTINGS },
    { title: 'Security', id: 'security', path: ROUTE_SETTINGS_SECURITY },
    { title: 'Postpaid Billing', id: 'postpaid', path: ROUTE_SETTINGS_POSTPAID },
    { title: 'Payment Method', id: 'payment', path: ROUTE_SETTINGS_PAYMENT },
];

export default menuItems