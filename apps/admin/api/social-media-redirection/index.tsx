/* eslint-disable import/no-anonymous-default-export */
import querystring from '@mtcloud/utils/querystring';

export default (axios: any, base: string) => ({
  getAll: async (offset: number, limit: number, sortBy?: number, sortDir?: string) => {
    const query = { pageNo: offset, pageSize: limit, sortBy, sortDir };
    try {
      const data = await axios.get(`${base}/social-media-redirections/all`, { params: query });
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/social-media-redirection line: 11', error);
      throw error;
    }
  },
  getOne: async (id: string) => {
    try {
      const data = await axios.get(`${base}/social-media-redirections?socialMediaRedirectionId=${id}`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/social-media-redirection line: 22', error);
      throw error;
    }
  },
  post: async (formFields: any) => {
    try {
      return await axios.post(`${base}/social-media-redirections`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/social-media-redirection line: 30', error);
      throw error;
    }
  },
  put: async (formFields: any) => {
    try {
      return await axios.put(`${base}/social-media-redirections`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/social-media-redirection line: 38', error);
      throw error;
    }
  },
  delete: async (id: string) => {
    try {
      return await axios.delete(`${base}/social-media-redirections?id=${id}`);
    } catch (error) {
      console.log('🚀 ${error.name} in api/social-media-redirection line: 46', error);
      throw error;
    }
  },
});
