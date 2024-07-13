/* eslint-disable import/no-anonymous-default-export */
import querystring from '@mtcloud/utils/querystring';

export default (axios: any, base: string) => ({
  getAll: async () => {
    const query = querystring.stringify({ offset: 0, limit: 10 });
    try {
      const data = await axios.get(`${base}/promotional-offer/all?${query}`);
      return data?.data;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/promotional-offer' at line:10`, error.message);
      throw error;
    }
  },
  put: async (formFields: any) => {
    try {
      return await axios.put(`${base}/promotional-offer`, formFields);
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/promotional-offer' at line:18`, error.message);
      throw error;
    }
  },
});
