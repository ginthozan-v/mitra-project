/*
 * File: menuItems.ts
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: Tuesday, 24 May 2022 02:56 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import {
    ROUTE_LOYALTY,
    ROUTE_LOYALTY_SPECIAL_OFFER,
    ROUTE_LOYALTY_POINT_HISTORY,
    ROUTE_LOYALTY_ABOUT_POINTS,
} from 'constants/routes';


const menuItems = [
    { title: 'Loyalty Club', id: 'club', path: ROUTE_LOYALTY },
    { title: 'Special Offer', id: 'offer', path: ROUTE_LOYALTY_SPECIAL_OFFER },
    { title: 'Point History', id: 'history', path: ROUTE_LOYALTY_POINT_HISTORY },
    { title: 'About Points & History', id: 'about', path: ROUTE_LOYALTY_ABOUT_POINTS },
];

export default menuItems;