/* eslint-disable import/no-anonymous-default-export */

import querystring from '@mtcloud/utils/querystring';

export default (axios: any, base: string) => ({
  getAll: async (offset: number, limit: number, sortBy?: number, sortDir?: string) => {
    const query = querystring.stringify({
      offset,
      limit,
    });
    try {
      const data = await axios.get(`${base}/featured?${query}`);
      return data?.data;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/featured-products' at line:17`, error.message);
      throw error;
    }
  },
  getOne: async (id: number) => {
    try {
      const data = await axios.get(`${base}/featured/${id}`);
      return data?.data;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/featured-products' at line:26`, error.message);
      throw error;
    }
  },
  post: async (formFields: any) => {
    try {
      return await axios.post(`${base}/featured/`, formFields);
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/featured-products' at line:34`, error.message);
      throw error;
    }
  },
  put: async (formFields: any, id: any) => {
    try {
      return await axios.put(`${base}/featured/${id}`, formFields);
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/featured-products' at line:42`, error.message);
      throw error;
    }
  },
  delete: async (id: string) => {
    try {
      return await axios.delete(`${base}/featured/${id}`);
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/featured-products' at line:50`, error.message);
      throw error;
    }
  },
});
