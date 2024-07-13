/* eslint-disable import/no-anonymous-default-export */
import querystring from '@mtcloud/utils/querystring';

export default (axios: any, base: string) => ({
  getAll: async (offset: number, limit: number, sortBy?: number, sortDir?: string) => {
    const query = { pageNo: offset, pageSize: limit, sortBy, sortDir };
    try {
      const data = await axios.get(`${base}/faq-category/all`, { params: query });
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/faq-category line: 12', error);
      throw error;
    }
  },
  getOne: async (id: number) => {
    try {
      const data = await axios.get(`${base}/faq-category?faqCategoryId=${id}`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/faq-category line: 21', error);
      throw error;
    }
  },
  post: async (formFields: any) => {
    try {
      return await axios.post(`${base}/faq-category`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/faq-category line: 29', error);
      throw error;
    }
  },
  put: async (formFields: any) => {
    try {
      return await axios.put(`${base}/faq-category`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/faq-category line: 37', error);
      throw error;
    }
  },
  delete: async (id: string) => {
    try {
      return await axios.delete(`${base}/faq-category?id=${id}`);
    } catch (error) {
      console.log('🚀 ${error.name} in api/faq-category line: 45', error);
      throw error;
    }
  },
});
