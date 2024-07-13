/* eslint-disable import/no-anonymous-default-export */
import querystring from '@mtcloud/utils/querystring';

export default (axios: any, base: string) => ({
  getAll: async (offset: number, limit: number, sortBy?: number, sortDir?: string) => {
    const query = { pageNo: offset, pageSize: limit, sortBy, sortDir };
    try {
      const data = await axios.get(`${base}/latest-news/all`, { params: query });
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/latest-news line: 11', error);
      throw error;
    }
  },
  getOne: async (id: number) => {
    try {
      const data = await axios.get(`${base}/latest-news?newsId=${id}`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/latest-news line: 20', error);
      throw error;
    }
  },
  post: async (formFields: any) => {
    try {
      return await axios.post(`${base}/latest-news`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/latest-news line: 28', error);
      throw error;
    }
  },
  put: async (formFields: any) => {
    try {
      return await axios.put(`${base}/latest-news`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/latest-news line: 36', error);
      throw error;
    }
  },
  delete: async (id: string) => {
    try {
      return await axios.delete(`${base}/latest-news?id=${id}`);
    } catch (error) {
      console.log('🚀 ${error.name} in api/latest-news line: 44', error);
      throw error;
    }
  },
});
