/**
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: 20 October 2022, 17:06
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

export default (axios: any, api_url: string) => ({
  getAll: async () => {
    try {
      const res = await axios.get(api_url);
      return res.data;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/system-emails' at line:13`, error.message);
      throw error;
    }
  },
  get: async (type: string) => {
    try {
      const res = await axios.get(`${api_url}/type/${type}`);
      return res.data;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/system-emails' at line:13`, error.message);
      throw error;
    }
  },
  put: async (type, emails) => {
    try {
      await axios.put(`${api_url}/type/${type}`, emails);
      return true;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/system-emails' at line:22`, error.message);
      throw error;
    }
  },
});
