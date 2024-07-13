/*
 * File: categories.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 20 July 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { ROUTE_FAQ, ROUTE_INDUSTRIES, ROUTE_MARKETPLACE, ROUTE_PRCING, ROUTE_PRODUCTS } from "constants/routes";

const learnLinks = [
    {
        id: 'faq',
        level: 1,
        title: 'FAQ',
        path: ROUTE_FAQ,
    },
    {
        id: 'documents',
        level: 1,
        title: 'Documents',
        path: '',
    },
];

const menuLinks = [
    {
        id: 1,
        titleFE: 'Products',
        level: 0,
        expandable: true,
        URL: ROUTE_PRODUCTS,
        isExternal: false,
        requireAuth: false
    },
    {
        id: 2,
        titleFE: 'Marketplace',
        level: 0,
        expandable: false,
        URL: ROUTE_MARKETPLACE,
        isExternal: false,
        requireAuth: false
    },
    {
        id: 3,
        titleFE: 'Industries',
        level: 0,
        expandable: false,
        URL: ROUTE_INDUSTRIES,
        isExternal: false,
        requireAuth: false
    },
    {
        id: 4,
        titleFE: 'Pricing',
        level: 0,
        // children: learnLinks,
        expandable: false,
        URL: ROUTE_PRCING,
        isExternal: false,
        requireAuth: false,
    },
    {
        id: 5,
        titleFE: 'Learn',
        level: 0,
        children: learnLinks,
        expandable: true,
        URL: '',
        isExternal: true,
        requireAuth: false
    },
];

export default menuLinks