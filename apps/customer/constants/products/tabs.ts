
/*
* File: tabs.ts
* Project: MT Cloud Portal
* Author: Dilum Sanjaya (dranasinghe@mitrai.com)
* File Created: 8 April 2022 12:00 pm
* Module: MT Cloud Portal Frontend
* Copyright 2022 - 2022 Mitra Innovation Ltd.
*/

import { ROUTE_PRODUCT_BUILD, ROUTE_PRODUCT_OVERVIEW, ROUTE_PRODUCT_PREBUILD } from "constants/routes";


const tabData = [
    { id: 'overview', title: 'Overview', link: ROUTE_PRODUCT_OVERVIEW },
    { id: 'prebuild', title: 'Pre-Built Offers', link: ROUTE_PRODUCT_PREBUILD },
    { id: 'build', title: 'Build Your Own', link: ROUTE_PRODUCT_BUILD },
];


export default tabData
