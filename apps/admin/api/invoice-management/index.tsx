import querystring from '@mtcloud/utils/querystring';

export default (axios: any, base: string) => ({
  getAll: async (offset: number, limit: number, from?: string, to?: string, keyword?: string) => {
    const query = { offset, limit, keyword, from, to };
    try {
      const data = await axios.get(`${base}/payment/admin/invoice`, { params: query });
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/invoice-management line: 10', error);
      throw error;
    }
  },
  getOne: async (id: number) => {
    try {
      const data = await axios.get(`${base}/payment/admin/receipt/${id}`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/invoice-management line: 19', error);
      throw error;
    }
  },
  downloadReceipt: async (id: number) => {
    try {
      const data = await axios.get(`${base}/payment/admin/receipt/${id}/download`);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/invoice-management line: 28', error);
      throw error;
    }
  },
  refund: async (id: number, obj: any) => {
    try {
      const data = await axios.post(`${base}/credit-note/admin/receipt/${id}/refund`, obj);
      return data?.data;
    } catch (error) {
      console.log('🚀 ${error.name} in api/invoice-management line: 37', error);
      throw error;
    }
  },
  downloadCSV: async (offset: number, limit: number, from?: string, to?: string, keyword?: string) => {
    try {
      const query = querystring.stringify({ offset, limit, from, to, keyword });
      const data = await axios.get(`${base}/payment/admin/invoice/download?${query}`);
      return data?.data;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/faq-category' at line:33`, error.message);
      throw error;
    }
  },
});
