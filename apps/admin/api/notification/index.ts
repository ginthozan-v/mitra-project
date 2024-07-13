/* eslint-disable import/no-anonymous-default-export */
import querystring from '@mtcloud/utils/querystring';

export default (axios: any, base: string) => ({
  get: async (offset?: number, limit?: number) => {
    const query = { statuses: 'READ,UNREAD', offset, limit, categories: 'ALERT' };
    try {
      const data = await axios.get(`${base}/admin/notification/alert`, { params: query });
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/notifications line: 11', error);
      throw error;
    }
  },
  patch: async (id: number, body: any) => {
    try {
      const data = await axios.patch(`${base}/admin/notification/alert?id=${id}`, body);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/notifications line: 11', error);
      throw error;
    }
  },
});
