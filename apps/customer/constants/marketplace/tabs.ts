/*
 * File: tabs.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 11 May 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { ROUTE_MARKETPLACE_OVERVIEW, ROUTE_MARKETPLACE_PREBUILD, ROUTE_MARKETPLACE_PRICE_CALCULATOR } from "constants/routes";


const tabData = [
    { id: 'overview', title: 'Overview', link: ROUTE_MARKETPLACE_OVERVIEW },
    { id: 'prebuild', title: 'Pre-Built Offers', link: ROUTE_MARKETPLACE_PREBUILD },
    { id: 'priceCalculator', title: 'Build Your Own', link: ROUTE_MARKETPLACE_PRICE_CALCULATOR },
];


export default tabData
