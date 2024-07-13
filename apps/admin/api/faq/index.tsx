/* eslint-disable import/no-anonymous-default-export */
import querystring from '@mtcloud/utils/querystring';

export default (axios: any, base: string) => ({
  getAll: async (offset: number, limit: number, sortBy?: number, sortDir?: string) => {
    const query = { pageNo: offset, pageSize: limit, sortBy, sortDir };
    try {
      const data = await axios.get(`${base}/faq/all`, { params: query });
      return data?.data;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/faq-category' at line:20`, error.message);
      return [];
    }
  },
  getOne: async (id: number) => {
    try {
      const data = await axios.get(`${base}/faq?faqId=${id}`);
      return data?.data;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/faq-category' at line:33`, error.message);
      return null;
    }
  },
  post: async (formFields: any) => {
    try {
      return await axios.post(`${base}/faq`, formFields);
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/faq-category' at line:45`, error.message);
      return error.response;
    }
  },
  put: async (formFields: any) => {
    try {
      return await axios.put(`${base}/faq`, formFields);
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/faq-category' at line:58`, error.message);
      return null;
    }
  },
  delete: async (id: string) => {
    try {
      return await axios.delete(`${base}/faq?id=${id}`);
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/faq-category' at line:71`, error.message);
      return error.response;
    }
  },
});
