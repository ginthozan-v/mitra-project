import { authHeader } from 'api';
import { Axios } from 'axios';

/* eslint-disable import/no-anonymous-default-export */
export default (axios: Axios, base: string) => {
  const config = {
    headers: authHeader,
  };
  return {
    generateQrCode: async () => {
      try {
        const res = await axios.get(`${base}/me/totp`, config);
        return res.data;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/user/settings'`, error.message);
        return error.response;
      }
    },
  };
};
