/*
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 29 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import {
  ChartIcon,
  CMSIcon,
  UserSettingsIcon,
  SettingIcon,
  UserAddIcon,
  BillingIcon,
} from '@mtcloud/ui/atoms/icons';
import {
  ROUTE_AUTO_LOGOUT_TIMEOUT,
  ROUTE_BILLING_BILLER_MGMT,
  ROUTE_BILLING_BILLING_STATUS,
  ROUTE_BILLING_RULE_CUSTOMIZATION,
  ROUTE_CMS_ABOUT_US,
  ROUTE_CMS_CONTACT_US,
  ROUTE_CMS_COUNTRY_LIST_MGMT,
  ROUTE_CMS_FAQ_CATEGORY_MGMT,
  ROUTE_CMS_FAQ_LIST_MGMT,
  ROUTE_CMS_HOME_FEATURED_PRODUCTS,
  ROUTE_CMS_HOME_HERO_BANNER,
  ROUTE_CMS_HOME_LATEST_NEWS,
  ROUTE_CMS_HOME_LOGO,
  ROUTE_CMS_HOME_LOYALITY_MGMT,
  ROUTE_CMS_HOME_PrivacyPolicy_MGMT,
  ROUTE_CMS_HOME_PROMOTION_MGMT,
  ROUTE_CMS_LOYALITY_TOGGLE,
  ROUTE_CMS_PAYMENT_METHODS,
  ROUTE_CMS_PRIMARY_MENU_MGMT,
  ROUTE_CMS_SOCIAL_MEDIA,
  ROUTE_COPYRIGHTS_MGMT,
  ROUTE_DASHBOARD,
  ROUTE_ENTERPRISE_USER,
  ROUTE_ROLE_MGMT,
  ROUTE_USER_MGMT,
  ROUTE_CMS_PAYMENT_TERMS,
  ROUTE_BILLING_INVOICE_MGMT,
  ROUTE_TECH_SUPPORT,
  ROUTE_ADMIN_USER_MGMT,
} from 'constants/routes';
import type { MenuItem } from './types';
import { PrimaryItems, RoutingItems } from './types';

const settings = [{
  id: 'settings',
  code: 'SETTINGS_SUB',
  title: 'Settings',
  items: [
    { id: 'techSupport', code: 'TECH_SUPPORT', route: ROUTE_TECH_SUPPORT, title: 'Tech Support' },]
}]

const secondaryBilling = [
  {
    id: 'billingList',
    code: 'BILLING_SUB',
    title: 'Billing',
    items: [
      {
        id: 'billerMgmt',
        code: 'BILLING_MANAGEMENT',
        route: ROUTE_BILLING_BILLER_MGMT,
        title: 'Biller Management',
      },
      {
        id: 'invoiceMgmt',
        code: 'INVOICE_MANAGEMENT',
        route: ROUTE_BILLING_INVOICE_MGMT,
        title: 'Invoice Management',
      },
      {
        id: 'billingStatus',
        code: 'BILLING_STATISTICS',
        route: ROUTE_BILLING_BILLING_STATUS,
        title: 'Billing Statistics',
      },
      {
        id: 'ruleCustomization',
        code: 'RULE_CUSTOMIZATION',
        route: ROUTE_BILLING_RULE_CUSTOMIZATION,
        title: 'Rule Customisation',
      },
    ],
  },
];

const secondaryMgmt = [
  {
    id: 'mgmtList',
    code: 'USER_ROLE_MANAGEMENT_SUB',
    title: 'User & Role Management',
    items: [
      { id: 'user', code: 'USER_MANAGEMENT', route: ROUTE_USER_MGMT, title: 'User Management' },
      { id: 'role', code: 'ROLE_MANAGEMENT', route: ROUTE_ROLE_MGMT, title: 'Role Management' },
      { id: 'admin-user', code: 'ADMIN_USER_MANAGEMENT', route: ROUTE_ADMIN_USER_MGMT, title: 'Admin User Management' },
    ],
  },
];

const secondaryEnterpriseUser = [
  {
    id: 'enterpriseUser',
    code: 'ENTERPRISE_USER_SUB',
    title: 'Enterprise User',
    items: [
      {
        id: 'user',
        code: 'CREATE_ENTERPRISE_USER',
        route: ROUTE_ENTERPRISE_USER,
        title: 'Create Enterprise Users',
      },
    ],
  },
];

const cmsHome = {
  id: 'home',
  code: 'HOME',
  title: 'Home',
  items: [
    { id: 'logo', code: 'LOGO', route: ROUTE_CMS_HOME_LOGO, title: 'Logo' },
    {
      id: 'heroBanner',
      code: 'HERO_BANNER',
      route: ROUTE_CMS_HOME_HERO_BANNER,
      title: 'Hero banner',
    },
    {
      id: 'featuredProducts',
      code: 'FEATURED_PRODUCTS',
      route: ROUTE_CMS_HOME_FEATURED_PRODUCTS,
      title: 'Featured products',
    },
    {
      id: 'latestNews',
      code: 'LATEST_NEWS',
      route: ROUTE_CMS_HOME_LATEST_NEWS,
      title: 'Latest news',
    },
    {
      id: 'loyalityManagement',
      code: 'LOYALITY_SECTION',
      route: ROUTE_CMS_HOME_LOYALITY_MGMT,
      title: 'Loyalty home',
    },
    {
      id: 'promotionManagement',
      code: 'PROMOTION_SECTION',
      route: ROUTE_CMS_HOME_PROMOTION_MGMT,
      title: 'Promotions home',
    },
    {
      id: 'privacyPolicyManagement',
      code: 'PRIVAY_POLICY',
      route: ROUTE_CMS_HOME_PrivacyPolicy_MGMT,
      title: 'Privacy policy',
    },
    {
      id: 'socialMediaRedirection',
      code: 'SOCIAL_MEDIA',
      route: ROUTE_CMS_SOCIAL_MEDIA,
      title: 'Social Media Redirection',
    },
    {
      id: 'copyrightsManagement',
      code: 'COPYRIGHTS',
      route: ROUTE_COPYRIGHTS_MGMT,
      title: 'Copyrights management',
    },
    {
      id: 'logoutTimeout',
      code: 'AUTO_LOGOUT_TIMEOUT',
      route: ROUTE_AUTO_LOGOUT_TIMEOUT,
      title: 'Auto-logout timeout',
    },
  ],
};

const cmsPrimaryMenu = {
  id: 'primaryMenu',
  code: 'PRIMARY_MENU',
  title: 'Primary menu',
  items: [
    {
      id: 'primaryMenuManagement',
      code: 'PRIMARY_MENU',
      route: ROUTE_CMS_PRIMARY_MENU_MGMT,
      title: 'Primary menu',
    },
  ],
};

const cmsRegistration = {
  id: 'reg',
  code: 'REGISTRATION',
  title: 'Registration',
  items: [
    {
      id: 'countryListManagement',
      code: 'COUNTRY_LIST',
      route: ROUTE_CMS_COUNTRY_LIST_MGMT,
      title: 'Country list',
    },
  ],
};

const cmsAboutUs = {
  id: 'aboutUs',
  code: 'ABOUT_US',
  title: 'About us',
  items: [
    {
      id: 'aboutUsManagement',
      code: 'ABOUT_US_MANAGEMENT',
      route: ROUTE_CMS_ABOUT_US,
      title: 'About us',
    },
  ],
};

const cmsLoyality = {
  id: 'loyality',
  code: 'LOYALTY',
  title: 'Loyality',
  items: [
    {
      id: 'loyalityToggle',
      code: 'ENABLE_DISABLE_LOYALTY',
      route: ROUTE_CMS_LOYALITY_TOGGLE,
      title: 'Loyalty enable/disable',
    },
  ],
};

const cmsContact = {
  id: 'contact',
  code: 'CONTACT_US',
  title: 'Contact detail',
  items: [
    {
      id: 'contactUsManagement',
      code: 'CONTACT_US_MANAGEMENT',
      route: ROUTE_CMS_CONTACT_US,
      title: 'Contact detail',
    },
  ],
};

const cmsFAQ = {
  id: 'faq',
  code: 'FAQ',
  title: 'FAQ',
  items: [
    {
      id: 'faqCategories',
      code: 'FAQ_CATEGORIES',
      route: ROUTE_CMS_FAQ_CATEGORY_MGMT,
      title: 'FAQ categories',
    },
    {
      id: 'faqLists',
      code: 'FAQ_LISTS',
      route: ROUTE_CMS_FAQ_LIST_MGMT,
      title: 'FAQ list',
    },
  ],
};

const cmsPayment = {
  id: 'payments',
  code: 'PAYMENT_METHODS',
  title: 'Payment methods',
  items: [
    {
      id: 'paymentMethods',
      code: 'PAYMENT_METHODS',
      route: ROUTE_CMS_PAYMENT_METHODS,
      title: 'Payment method',
    },
    {
      id: 'paymentTerms',
      code: 'PAYMENT_TERMS',
      route: ROUTE_CMS_PAYMENT_TERMS,
      title: 'Payment Terms & Conditions',
    },
  ],
};

const cmsStack = [
  cmsHome,
  cmsPrimaryMenu,
  cmsRegistration,
  cmsAboutUs,
  cmsLoyality,
  cmsContact,
  cmsFAQ,
  cmsPayment,
];

export const menuItems: MenuItem[] = [
  {
    id: PrimaryItems.Dashboard,
    code: 'MONITORING_CONSOLE',
    Icon: ChartIcon,
    secondaryItems: [],
    defaultRoute: ROUTE_DASHBOARD,
  },
  {
    id: PrimaryItems.CMS,
    code: 'CMS',
    Icon: CMSIcon,
    secondaryItems: cmsStack,
    defaultRoute: ROUTE_CMS_HOME_LOGO,
  },
  {
    id: PrimaryItems.Billing,
    code: 'BILLING',
    Icon: BillingIcon,
    secondaryItems: secondaryBilling,
    defaultRoute: ROUTE_BILLING_BILLER_MGMT,
  },
  {
    id: PrimaryItems.MGMT,
    code: 'USER_ROLE_MANAGEMENT',
    Icon: UserSettingsIcon,
    secondaryItems: secondaryMgmt,
    defaultRoute: ROUTE_USER_MGMT,
  },
  {
    id: PrimaryItems.User,
    code: 'ENTERPRISE_USER',
    Icon: UserAddIcon,
    secondaryItems: secondaryEnterpriseUser,
    defaultRoute: ROUTE_ENTERPRISE_USER,
  },
  {
    id: PrimaryItems.Settings,
    code: 'SETTINGS',
    Icon: SettingIcon,
    secondaryItems: settings,
    defaultRoute: ROUTE_TECH_SUPPORT,
  },
];

const routing: RoutingItems = {
  dashboard: { primary: PrimaryItems.Dashboard, secondary: null },
  billingMgmt: { primary: PrimaryItems.Billing, secondary: 'billerMgmt' },
  invoiceMgmt: { primary: PrimaryItems.Billing, secondary: 'invoiceMgmt' },
  billingStatus: {
    primary: PrimaryItems.Billing,
    secondary: 'billingStatus',
  },
  billingCustomization: {
    primary: PrimaryItems.Billing,
    secondary: 'ruleCustomization',
  },
  mgmtUser: { primary: PrimaryItems.MGMT, secondary: 'user' },
  mgmtAdminUser: { primary: PrimaryItems.MGMT, secondary: 'admin-user' },
  mgmtRole: { primary: PrimaryItems.MGMT, secondary: 'role' },
  userCreate: { primary: PrimaryItems.User, secondary: 'user' },
  settingsTech: { primary: PrimaryItems.Settings, secondary: 'techSupport' },
  cmsHomeLogo: { primary: PrimaryItems.CMS, secondary: 'logo' },
  cmsHomeHeroBanner: { primary: PrimaryItems.CMS, secondary: 'heroBanner' },
  cmsHomeFeaturedProducts: {
    primary: PrimaryItems.CMS,
    secondary: 'featuredProducts',
  },
  cmsHomeLatestNews: {
    primary: PrimaryItems.CMS,
    secondary: 'latestNews',
  },
  cmsHomeLoyalityMGMT: {
    primary: PrimaryItems.CMS,
    secondary: 'loyalityManagement',
  },
  cmsPromotionMGMT: {
    primary: PrimaryItems.CMS,
    secondary: 'promotionManagement',
  },
  cmsPrivacyPolicyMGMT: {
    primary: PrimaryItems.CMS,
    secondary: 'privacyPolicyManagement',
  },
  cmsSocialMedia: {
    primary: PrimaryItems.CMS,
    secondary: 'socialMediaRedirection',
  },
  cmsCountryListMGMT: {
    primary: PrimaryItems.CMS,
    secondary: 'countryListManagement',
  },
  cmsAboutUsMGMT: {
    primary: PrimaryItems.CMS,
    secondary: 'aboutUsManagement',
  },
  cmsPrimaryMenuMGMT: {
    primary: PrimaryItems.CMS,
    secondary: 'primaryMenuManagement',
  },
  cmsCopyrightsMGMT: {
    primary: PrimaryItems.CMS,
    secondary: 'copyrightsManagement',
  },
  cmsFaqCategoriesMGMT: {
    primary: PrimaryItems.CMS,
    secondary: 'faqCategories',
  },
  cmsFaqListMGMT: {
    primary: PrimaryItems.CMS,
    secondary: 'faqLists',
  },
  cmsLogoutTimeout: {
    primary: PrimaryItems.CMS,
    secondary: 'logoutTimeout',
  },
  cmsLoyalityToggle: {
    primary: PrimaryItems.CMS,
    secondary: 'loyalityToggle',
  },
  cmsContactUsMGMT: {
    primary: PrimaryItems.CMS,
    secondary: 'contactUsManagement',
  },
  cmsPaymentMethods: {
    primary: PrimaryItems.CMS,
    secondary: 'paymentMethods',
  },
  cmsPaymentTerms: {
    primary: PrimaryItems.CMS,
    secondary: 'paymentTerms',
  },
};

export default routing;
