/*
 * File: menuItems.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 09 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import {
    ROUTE_BILLING,
    ROUTE_BILLING_HISTORY,
    ROUTE_PURCHASED_PRODUCTS,
    ROUTE_PAYMENT_HISTORY,
} from 'constants/routes';


const menuItems = [
    { title: 'Dashboard', id: 'dashboard', path: ROUTE_BILLING },
    { title: 'Purchased Products', id: 'purchase', path: ROUTE_PURCHASED_PRODUCTS },
    { title: 'Billing History', id: 'billing', path: ROUTE_BILLING_HISTORY },
    { title: 'Payment History', id: 'payment', path: ROUTE_PAYMENT_HISTORY },
];

export default menuItems;