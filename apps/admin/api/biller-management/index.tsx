/* eslint-disable import/no-anonymous-default-export */
import querystring from '@mtcloud/utils/querystring';
import { AxiosInstance } from 'axios';

export default (axios: AxiosInstance, base: string) => ({
  getAll: async (offset: number, limit: number, from?: string, to?: string, keyword?: string) => {
    const query = querystring.stringify({ offset, limit, from, to, keyword });
    try {
      const data = await axios.get(`${base}/billing/admin/history?${query}`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/biller-management line: 11', error);
      throw error;
    }
  },
  getOne: async (id: string) => {
    try {
      const data = await axios.get(`${base}/billing/admin/bill/${id}`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/biller-management line: 20', error);
      throw error;
    }
  },
  billingHistory: async (id: string, offset: number, limit: number, keyword?: string) => {
    const query = querystring.stringify({ offset, limit, keyword });
    try {
      const data = await axios.get(`${base}/billing/admin/bill/${id}/history?${query}`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/biller-management line: 30', error);
      throw error;
    }
  },
  downloadBilling: async (id: number) => {
    try {
      const data = await axios.get(`${base}/billing/admin/bill/${id}/download`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/biller-management line: 39', error);
      throw error;
    }
  },
  //#region REPORT
  revenueStatistics: async (payload) => {
    try {
      const data = await axios.post(`${base}/reports/reconsile`, payload);
      return data?.data;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/faq-category' at line:33`, error.message);
      throw error;
    }
  },
  //#endregion
  downloadCSV: async (offset: number, limit: number, from?: string, to?: string, keyword?: string) => {
    try {
      const query = querystring.stringify({ offset, limit, from, to, keyword });
      const data = await axios.get(`${base}/billing/admin/history/download?${query}`);
      return data?.data;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/faq-category' at line:33`, error.message);
      throw error;
    }
  },
});
