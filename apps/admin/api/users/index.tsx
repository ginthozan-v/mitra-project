/* eslint-disable import/no-anonymous-default-export */
import querystring from '@mtcloud/utils/querystring';

export default (axios: any, base: string) => ({
  getAll: async (offset: number, limit: number, expand: string) => {
    const query = querystring.stringify({ offset: offset, limit: limit, expand: expand });
    try {
      const data = await axios.get(`${base}/admin/user?${query}`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/users line: 11', error);
      throw error;
    }
  },
  getOne: async (id: string) => {
    try {
      const data = await axios.get(`${base}/admin/user/${id}`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/users line: 20', error);
      throw error;
    }
  },
  post: async (formFields: any) => {
    try {
      return await axios.post(`${base}/admin/user`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/users line: 28', error);
      throw error;
    }
  },
  put: async (formFields: any) => {
    try {
      return await axios.put(`${base}/admin/user`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/users line: 36', error);
      throw error;
    }
  },
  ldapUserSearch: async (char: string) => {
    const query = querystring.stringify({ parameter: char });
    try {
      const data = await axios.get(`${base}/admin/user/find/all?${query}`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/users line: 46', error);
      throw error;
    }
  },
  getAdminData: async () => {
    try {
      const data = await axios.get(`${base}/user-master-data`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/users line: 46', error);
      throw error;
    }
  },
  adminDataPost: async (formFields: any) => {
    try {
      return await axios.post(`${base}/user-master-data`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/users line: 28', error);
      throw error;
    }
  },
  adminDataDelete: async (id: any) => {
    try {
      return await axios.delete(`${base}/user-master-data/${id}`);
    } catch (error) {
      console.log('🚀 ${error.name} in api/users line: 28', error);
      throw error;
    }
  },
});
