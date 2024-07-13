/* eslint-disable import/no-anonymous-default-export */
import querystring from '@mtcloud/utils/querystring';

export default (axios: any, base: string) => ({
  getAll: async (offset: number, limit: number, sortBy?: string, sortDir?: string, active?: boolean) => {
    const query = {
      pageNo: offset,
      pageSize: limit,
      sortBy,
      sortDir,
      active,
    };
    try {
      const data = await axios.get(`${base}/country/all`, { params: query });
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/country line: 23', error);
      throw error;
    }
  },
  put: async (formFields: any) => {
    try {
      return await axios.put(`${base}/country`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/country line: 31', error);
      throw error;
    }
  },
  getCountries: async (offset: number, limit: number, sortBy?: number, sortDir?: string) => {
    const query = querystring.stringify({ pageNo: offset, pageSize: limit, sortBy, sortDir });
    try {
      const data = await axios.get(`${base}/country/all?${query}`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/country line: 41', error);
      throw error;
    }
  },
});
