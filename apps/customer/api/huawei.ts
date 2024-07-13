import { AxiosInstance } from 'axios';

export default (axios: AxiosInstance, base: string) => ({
  getUserProduct: async (userId: string, productCode: string, region: string) => {
    try {
      return {
        // hard-coded values to be used until api is ready...
        product_id: '80d2608e73d748edbbeb26b81f195109',
        vdc_id: 'bfc2268d-a588-4382-843a-996c460d2819',
      };
      const res = await axios.get(`${base}/getuserproduct/${userId}?productType=${productCode}&regionId=${region}`);
      return res?.data;
    } catch (error) {
      console.error(`🚀 ERROR in api.products.getUserProduct`, error);
      return [];
    }
  },
});
