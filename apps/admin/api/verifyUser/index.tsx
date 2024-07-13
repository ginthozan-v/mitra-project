export default (axios: any, base: string) => ({
  verifyEmail: async (email: string) => {
    try {
      const res = await axios.get(`${base}/user/by-email-address/${email}`);
      return res.data.userExists;
    } catch (error) {
      console.log('🚀 ${error.name} in api/verifyUser line: 9', error);
      throw error;
    }
  },
});
