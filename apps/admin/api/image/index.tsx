/**
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: 28 October 2022, 13:35
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

export default (axios: any, api_url: string) => ({
  post: async (data) => {
    try {
      const res = await axios.post(`${api_url}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data.fileName;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/image`, error.message);
      return null;
    }
  },
  delete: async (fileName) => {
    try {
      await axios.delete(`${api_url}/${fileName}`);
      return true;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/image`, error.message);
      return false;
    }
  },
  get: async (fileName: string) => {
    try {
      const res = await axios.get(`${api_url}/${fileName}`);
      return res.data;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/system-emails' at line:13`, error.message);
      throw error;
    }
  },
  put: async (fileName, data) => {
    try {
      await axios.put(`${api_url}/${fileName}`, data);
      return true;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/image`, error.message);
      return false;
    }
  },
});
