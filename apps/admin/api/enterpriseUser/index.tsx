/* eslint-disable import/no-anonymous-default-export */

export default (axios: any, base: string) => ({
  post: async (formFields: any) => {
    try {
      return await axios.post(`${base}/user-registration/register/init`, formFields);
    } catch (error) {
      console.log('🚀 ${error.name} in api/enterpriseUser line: 8', error);
      throw error;
    }
  },
});
