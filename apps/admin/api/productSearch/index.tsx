/* eslint-disable import/no-anonymous-default-export */

export default (axios: any, base: string) => ({
  getMarketPlaceSubcategory: async () => {
    try {
      const data = await axios.get(`${base}/marketplace/subcategory`);
      return data?.data;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/product-search' at line:10`, error.message);
      throw error;
    }
  },
  getProductsCatalogueSubcategory: async () => {
    try {
      const data = await axios.get(`${base}/product/subcategory`);
      return data?.data;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/product-search' at line:19`, error.message);
      throw error;
    }
  },
  getSolutionCatalogue: async () => {
    try {
      const data = await axios.get(`${base}/solution`);
      return data?.data;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/product-search' at line:28`, error.message);
      throw error;
    }
  },
});
