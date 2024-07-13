/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 29 June 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { apiController } from '@/api';
import { AxiosInstance } from 'axios';
import { getAuth } from 'utils/auth';

/* eslint-disable import/no-anonymous-default-export */
export default (axios: AxiosInstance, base: string, base_server: string) => ({
  getProducts: async (expand: string, lang: string, isServerside = false) => {
    try {
      const params = { expand: expand };
      const res = await axios.get(`${isServerside ? base_server : base}/product/category`, {
        params,
      });
      const response = res.data.productCategories.map(({ keywords, categoryId, category, sortOrder, subCategory }) => ({
        keywords,
        categoryId,
        category: category[lang],
        sortOrder,
        subCategory: subCategory.map(({ subCategoryId, sortOrder, productSubCategoryTitle, productCategoryLongDescription }) => ({
          subCategoryId,
          sortOrder,
          productSubCategoryTitle: productSubCategoryTitle[lang],
          productSubCategoryShortDescription: productCategoryLongDescription[lang],
        })),
      }));

      return response;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api.products.getProducts'`, error.message);
      return [];
    }
  },

  getAdvantages: async (subcategory: string, lang: string, isServerside = false) => {
    try {
      const res = await axios.get(`${isServerside ? base_server : base}/product/category/by-subcategory-id/${subcategory}`);
      const response = res.data.subCategory.map(
        ({
          keywords,
          productSubCategoryCode,
          subCategoryId,
          sortOrder,
          productSubCategoryTitle,
          productCategoryLongDescription,
          banner,
          advantages,
        }) => ({
          keywords: [keywords, productSubCategoryCode].join(','),
          subCategoryId,
          sortOrder,
          productSubCategoryCode,
          productSubCategoryTitle: productSubCategoryTitle[lang],
          productSubCategoryShortDescription: productCategoryLongDescription[lang],
          banner: banner !== null ? banner[lang] : null,
          advantages: advantages.map(({ advantageId, productCategoryAdvantageTitle, productCategoryAdvantageDescription, icon }) => ({
            advantageId,
            productCategoryAdvantageTitle: productCategoryAdvantageTitle[lang],
            productCategoryAdvantageDescription: productCategoryAdvantageDescription[lang],
            icon,
          })),
        }),
      );

      return response;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api.products.getAdvantages'`, error.message);
      return [];
    }
  },

  searchProducts: async (keyword: string, lang: string) => {
    try {
      const params = { keyword: keyword, offset: 0, limit: 100 };
      const res = await axios.get(`${base}/product/category/search`, { params });
      const response = res.data.productCategories.map(({ categoryId, category, subCategory }) => ({
        categoryId,
        category: category[lang],
        subCategory: subCategory.map(({ subCategoryId, productSubCategoryTitle, productSubCategoryShortDescription }) => ({
          subCategoryId,
          productSubCategoryTitle: productSubCategoryTitle[lang],
          productSubCategoryShortDescription: productSubCategoryShortDescription[lang],
        })),
      }));
      return response;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api.products.searchProducts'`, error.message);
      return [];
    }
  },

  getPrebuildOffers: async (
    subcategory: string,
    lang: string,
    currency = 'MUR',
    isMarketplace: boolean,
    isServerside = false,
    region = '',
    formatted = true,
  ) => {
    try {
      let isEnterpriseClient = false;
      if (getAuth()?.userType === 'enterprise') {
        isEnterpriseClient = true;
      }

      const params = {
        offset: 0,
        limit: 10,
        isMarketplace: isMarketplace,
        isEnterpriseClient: isEnterpriseClient,
        currency: currency,
      };
      if (region) {
        params['region'] = region;
      }

      const res = await axios.get(`${isServerside ? base_server : base}/product/by-subcategory-id/${subcategory}`, { params });
      if (!formatted) {
        return res.data.products;
      }

      const response = res.data.products.map(({ productId, basic, price, configuration, convertedPriceDto, discount, specification }) => ({
        productId,
        productName: basic.productName,
        description: basic.productDescription[lang],
        displayItemCode: basic.displayItemCode,
        price: convertedPriceDto.unitPriceMonth,
        currencySymbol: convertedPriceDto.currency.symbol + ' ',
        unit: price.unit,
        priceDisclaimer: price.priceDisclaimer,
        isEnterpriseClientOnly: configuration.isEnterpriseClientOnly,
        minimumNumberOfUnitwithinSinglePurchase: configuration.minimumNumberOfUnitwithinSinglePurchase,
        maximumNumberofUnitwithinSinglePurchase: configuration.maximumNumberofUnitwithinSinglePurchase,
        discount: discount.discount,
        region: specification.region,
        specifications: [
          { attributeName: 'vCPU', attributeVal: specification.vCPU !== null && specification.vCPU !== 0 ? specification.vCPU : null },
          {
            attributeName: 'Default number of units for storage',
            attributeVal: specification.storage !== null && specification.storage !== 0 ? specification.storage + ' GB' : null,
          },
          {
            attributeName: 'Default number of units for bandwidth',
            attributeVal: specification.bandwidth !== null && specification.bandwidth !== 0 ? specification.bandwidth + ' Mbit/s' : null,
          },
          {
            attributeName: 'Memory in GIB',
            attributeVal: specification.memory !== null && specification.memory !== 0 ? specification.memory + ' GB' : null,
          },
          {
            attributeName: 'Generation',
            attributeVal: specification.generation !== null && specification.generation !== 0 ? specification.generation.name : null,
          },
          {
            attributeName: 'Architecture',
            attributeVal: specification.series !== null && specification.series !== 0 ? specification.series.name : null,
          },
          {
            attributeName: 'Disk type',
            attributeVal: specification.diskType !== null && specification.diskType !== 0 ? specification.diskType : null,
          },
        ],
        otherAttributes: specification.otherAttributes.map(({ key, value }) => ({
          attributeName: key,
          attributeVal: value,
        })),
      }));
      return response;
    } catch (error) {
      console.error(`🚀 ${error.name} in api.products.getPrebuildOffers`, error.message);
      return [];
    }
  },

  getProductSubcategories: async (isServerside = false) => {
    try {
      const res = await axios.get(`${isServerside ? base_server : base}/product/subcategory?expand=none&lite=false`);
      return res?.data?.productSubCategories;
    } catch (error) {
      console.error(`🚀 ERROR in api.products.getProductSubcategories`, error);
      return [];
    }
  },

  getAllMeta: async (isServerside = false) => {
    try {
      const res = await axios.get(`${isServerside ? base_server : base}/metadata/all`);
      return res?.data;
    } catch (error) {
      console.error(`🚀 ERROR in api.products.getAllMeta`, error);
      return [];
    }
  },

  getRegions: async (isServerside = false) => {
    try {
      const res = await axios.get(`${isServerside ? base_server : base}/metadata/region`);
      return res?.data?.regions || [];
    } catch (error) {
      console.error(`🚀 ERROR in api.products.getRegions`, error);
      return [];
    }
  },

  getProductAttributes: async (params: any, isServerside = false) => {
    try {
      //#region TO BE REMOVED...
      params = { ...params, isEnterpriseClient: true };
      //#endregion

      const res = await axios.get(`${isServerside ? base_server : base}/product/attribute-list`, { params, signal: apiController.signal });
      return res?.data;
    } catch (error) {
      console.error(`🚀 ERROR in api.products.getProductAttributes`, error);
      return [];
    }
  },
});
