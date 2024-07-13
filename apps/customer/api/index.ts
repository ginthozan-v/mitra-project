/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 20 June 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { getAuth } from 'utils/auth';
import settings from './user/settings';
import products from './products';
import cart from './cart';
import industries from './industries';
import marketplace from './marketplace';
import home from './home';
import support from 'api/support';
import aboutUs from './aboutUs';
import notifications from './notifications';
import search from './search';
import billing from './user/billing';
import savedItems from './user/saved-items';
import payment from './payment';
import contactUs from './contactUs';
import register from './register';
import faq from './faq';
import latestNews from './latestNews';
import genericContents from 'api/generic-contents';
import initInterceptors from 'api/interceptors';
import paymentMethod from 'api/user/settings/payment-method';
import profile from './user/profile';
import pricingCalculator from '@/api/pricingCalculator';
import huawei from '@/api/huawei';
import otp from '@/api/otp';

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;
const API_URL_SERVER = process.env.NEXT_INTERNAL_API_ENDPOINT;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const auth = getAuth();

export const authHeader = {
  Authorization: auth ? `Bearer ${auth.access_token}` : null,
};

export const apiController = new AbortController();

initInterceptors(axios);

export default {
  support: support(axios, `${API_URL}/support/${API_VERSION}/support`),
  register: register(axios, API_VERSION, `${API_URL}/`),
  user: {
    settings: {
      ...settings(axios, `${API_URL}/user/${API_VERSION}/settings`),
      ...paymentMethod(axios, `${API_URL}/user/${API_VERSION}/settings`),
      // ...qrGenerator(axios, `https://portal-dev-is-console.mytcloud.mu/t/carbon.super/api/users/v1`),
    },
  },
  products: products(axios, `${API_URL}/product-search/${API_VERSION}`, `${API_URL_SERVER}/product-search/${API_VERSION}`),
  savedItems: savedItems(axios, API_VERSION, `${API_URL}/`),
  cart: cart(axios, `${API_URL}/cart/${API_VERSION}/cart`),
  payment: payment(axios, `${API_URL}/payment/v${API_VERSION}/payments`),
  industries: industries(axios, API_VERSION, `${API_URL}/`, `${API_URL_SERVER}/`),
  marketplace: marketplace(axios, API_VERSION, `${API_URL}/`, `${API_URL_SERVER}/`),
  genericContents: genericContents(
    axios,
    `${API_URL}/content/${API_VERSION}/generic-content`,
    `${API_URL_SERVER}/content/${API_VERSION}/generic-content`,
  ),
  home: home(axios, API_VERSION, `${API_URL}/`, `${API_URL_SERVER}/`),
  faq: faq(axios, `${API_URL}/content/${API_VERSION}`, `${API_URL_SERVER}/content/${API_VERSION}`),
  aboutUs: aboutUs(axios, API_VERSION, `${API_URL}/`, `${API_URL_SERVER}/`),
  notifications: notifications(axios, API_VERSION, `${API_URL}/`),
  search: search(axios, API_VERSION, `${API_URL}/`),
  billing: billing(axios, API_VERSION, `${API_URL}/`),
  contactUs: contactUs(axios, API_VERSION, `${API_URL}/`, `${API_URL_SERVER}/`),
  latestNews: latestNews(axios, API_VERSION, `${API_URL}/`, `${API_URL_SERVER}/`),
  profile: profile(axios, API_VERSION, `${API_URL}/`),
  huawei: huawei(axios, `${API_URL}/huawei/${API_VERSION}/huawei`),
  otp: otp(axios, `${API_URL}/user/${API_VERSION}`),
  pricingCalculator: pricingCalculator(axios, `${API_URL}/pricing-calculator/${API_VERSION}/pricing-calculator/calculate`),
};
