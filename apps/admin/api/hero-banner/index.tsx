/* eslint-disable import/no-anonymous-default-export */
import querystring from '@mtcloud/utils/querystring';

export default (axios: any, base: string) => ({
  getAll: async (offset: number, limit: number, sortBy?: number, sortDir?: string) => {
    const query = {
      pageNo: offset,
      pageSize: limit,
      sortBy,
      sortDir,
    };

    try {
      const data = await axios.get(`${base}/hero-banner/all`, { params: query });
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/hero-banner line: 16', error);
      throw error;
    }
  },
  getOne: async (id: number) => {
    try {
      const data = await axios.get(`${base}/hero-banner?bannerId=${id}`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/hero-banner line: 25', error);
      throw error;
    }
  },
  post: async (formFields: any) => {
    try {
      return await axios.post(`${base}/hero-banner/`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/hero-banner line: 33', error);
      throw error;
    }
  },
  put: async (formFields: any) => {
    try {
      return await axios.put(`${base}/hero-banner/`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/hero-banner line: 41', error);
      throw error;
    }
  },
  delete: async (id: string) => {
    try {
      return await axios.delete(`${base}/hero-banner?id=${id}`);
    } catch (error) {
      console.log('🚀 ${error.name} in api/hero-banner line: 49', error);
      throw error;
    }
  },
});
