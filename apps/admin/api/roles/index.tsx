/* eslint-disable import/no-anonymous-default-export */
import querystring from '@mtcloud/utils/querystring';

export default (axios: any, base: string) => ({
  getAll: async (offset: number, limit: number, expand: string, active?: string) => {
    const query = { offset: offset, limit: limit, expand: expand, active };
    try {
      const data = await axios.get(`${base}/admin/role`, { params: query });
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/roles line: 11', error);
      throw error;
    }
  },
  getOne: async (id: string) => {
    try {
      const data = await axios.get(`${base}/admin/role/${id}`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/roles line: 20', error);
      throw error;
    }
  },
  post: async (formFields: any) => {
    try {
      return await axios.post(`${base}/admin/role`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/roles line: 28', error);
      throw error;
    }
  },
  put: async (formFields: any) => {
    try {
      return await axios.put(`${base}/admin/role`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/roles line: 36', error);
      throw error;
    }
  },
});
