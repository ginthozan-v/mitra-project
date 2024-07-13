/* eslint-disable import/no-anonymous-default-export */
import initInterceptors from 'api/interceptors';
import axios from 'axios';
import adminPermission from './adminPermission';
import billerManagement from './biller-management';
import country from './country';
import enterpriseUser from './enterpriseUser';
import faq from './faq';
import faqCategory from './faq-category';
import featuredProducts from './featured-products';
import genericContent from './generic-content';
import heroBanner from './hero-banner';
import image from './image';
import invoiceManagement from './invoice-management';
import latestNews from './latest-news';
import loyality from './loyality';
import notification from './notification';
import paymentMethod from './payment-method';
import permissions from './permissions';
import primaryMenu from './primary-menu';
import productSearch from './productSearch';
import promotionalOffer from './promotional-offer';
import roles from './roles';
import ruleCustomization from './ruleCustomization';
import socialMediaRedirection from './social-media-redirection';
import techSupport from './techSupport';
import users from './users';
import verifyUser from './verifyUser';
import envConfig from '@/config';

const CP_ADMIN = '/cpadmin';
const CMS = '/cms';
const BILLING = '/billing-acp';
const USER = '/user';
const PRODUCT_SEARCH = '/product-search';
const NOTIFICATION = '/notification';

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

axios.defaults.baseURL = API_URL;
initInterceptors(axios);

export default {
  generic_content: genericContent(axios, `${CMS}/${API_VERSION}`),
  hero_banner: heroBanner(axios, `${CMS}/${API_VERSION}`),
  featured_products: featuredProducts(axios, `${CMS}/${API_VERSION}`),
  latest_news: latestNews(axios, `${CMS}/${API_VERSION}`),
  loyality: loyality(axios, `${CMS}/${API_VERSION}`),
  social_media_redirection: socialMediaRedirection(axios, `${CMS}/${API_VERSION}`),
  primary_menu: primaryMenu(axios, `${CMS}/${API_VERSION}`),
  country: country(axios, `${CMS}/${API_VERSION}`),
  faq_category: faqCategory(axios, `${CMS}/${API_VERSION}`),
  faq: faq(axios, `${CMS}/${API_VERSION}`),
  payment_method: paymentMethod(axios, `${CMS}/${API_VERSION}`),
  roles: roles(axios, `${CP_ADMIN}/${API_VERSION}`),
  users: users(axios, `${CP_ADMIN}/${API_VERSION}`),
  permissions: permissions(axios, `${CP_ADMIN}/${API_VERSION}/admin/user/permission`),
  admin_permissions: adminPermission(axios, `${CP_ADMIN}/${API_VERSION}`),
  biller_management: billerManagement(axios, `${BILLING}/${API_VERSION}`),
  invoice_management: invoiceManagement(axios, `${BILLING}/${API_VERSION}`),
  enterprise_user: enterpriseUser(axios, `${CP_ADMIN}/${API_VERSION}`),
  verify_user: verifyUser(axios, `${USER}/${API_VERSION}`),
  techSupport: techSupport(axios, `${CMS}/${API_VERSION}/system-emails`),
  product_search: productSearch(axios, `${PRODUCT_SEARCH}/${API_VERSION}`),
  rule_customization: ruleCustomization(axios, `${CMS}/${API_VERSION}`),
  promotional_offer: promotionalOffer(axios, `${CMS}/${API_VERSION}`),
  image: image(axios, `${CMS}/${API_VERSION}/static-content`),
  notification: notification(axios, `${NOTIFICATION}/${API_VERSION}`),
};
