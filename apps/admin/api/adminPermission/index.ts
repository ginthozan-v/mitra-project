/* eslint-disable import/no-anonymous-default-export */

export default (axios: any, base: string) => ({
  getAll: async () => {
    try {
      const data = await axios.get(`${base}/admin/permission`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/adminPermission line: 9', error);
      throw error;
    }
  },
});
