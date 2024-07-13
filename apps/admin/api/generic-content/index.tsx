/* eslint-disable import/no-anonymous-default-export */

export default (axios: any, base: string) => ({
  get: async (position: string) => {
    try {
      const data = await axios.get(`${base}/generic-content?position=${position}`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/generic-content line: 9', error);
      throw error;
    }
  },
  post: async (formFields: any) => {
    try {
      return await axios.post(`${base}/generic-content`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/generic-content line: 17', error);
      throw error;
    }
  },
  put: async (formFields: any) => {
    try {
      return await axios.put(`${base}/generic-content`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/generic-content line: 25', error);
      throw error;
    }
  },
  delete: async (id: string) => {
    try {
      return await axios.delete(`${base}/generic-content?id=${id}`);
    } catch (error) {
      console.log('🚀 ${error.name} in api/generic-content line: 33', error);
      throw error;
    }
  },
});
