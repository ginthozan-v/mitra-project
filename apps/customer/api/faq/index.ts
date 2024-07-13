/**
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 13 September 2022, 17:41
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { AxiosInstance } from 'axios';
import { Pagination } from 'models';

/* eslint-disable import/no-anonymous-default-export */
export default (axios: AxiosInstance, base: string, base_server: string) => ({
  getCategories: async (isServerside = false) => {
    try {
      const params = new Pagination({ pageSize: 100000 });
      const res = await axios.get(`${isServerside ? base_server : base}/faq-category/all`, { params });
      return res.data;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  getCategory: async (categoryId: string, isServerside = false) => {
    try {
      const params = new Pagination({ pageSize: 100000 });
      const res = await axios.get(`${isServerside ? base_server : base}/faq-category?faqCategoryId=${categoryId}`, { params });
      return res.data;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  getFAQsByCategory: async (categoryId: string, isServerside = false) => {
    try {
      const res = await axios.get(`${isServerside ? base_server : base}/faq/all?categoryId=${categoryId}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
});
