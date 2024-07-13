/* eslint-disable import/no-anonymous-default-export */
import querystring from '@mtcloud/utils/querystring';

export default (axios: any, base: string) => ({
  getAll: async (offset?: number, limit?: number, sortBy?: number, sortDir?: string) => {
    const query = { pageNo: offset, pageSize: limit, sortBy, sortDir };
    try {
      const data = await axios.get(`${base}/loyalty/all`, { params: query });
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/loyality line: 11', error);
      throw error;
    }
  },
  put: async (formFields: any) => {
    try {
      return await axios.put(`${base}/loyalty`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/loyality line: 19', error);
      throw error;
    }
  },
});
