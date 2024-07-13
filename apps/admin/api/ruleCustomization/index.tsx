export default (axios: any, base: string) => ({
  getVatPercentage: async () => {
    try {
      const data = await axios.get(`${base}/vat`);
      return data?.data;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/rule-customization' at line:7`, error.message);
      throw error;
    }
  },
  updateVatPercentage: async (formFields: any) => {
    try {
      return await axios.patch(`${base}/vat`, formFields);
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/rule-customization' at line:15`, error.message);
      throw error;
    }
  },
  getExchangeRate: async () => {
    try {
      const data = await axios.get(`${base}/currency-conversion`);
      return data?.data;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/rule-customization' at line:24`, error.message);
      throw error;
    }
  },
  updateExchangeRate: async (formFields: any) => {
    try {
      return await axios.patch(`${base}/currency-conversion`, formFields);
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/rule-customization' at line:32`, error.message);
      throw error;
    }
  },
});
