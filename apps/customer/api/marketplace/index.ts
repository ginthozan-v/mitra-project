/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Thurseday, 14 July 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

/* eslint-disable import/no-anonymous-default-export */
export default (axios, version: string, base: string, base_server: string) => ({
  getMarketplaceProducts: async (lang: string, isServerside = false) => {

    try {
      const res = await axios.get(
        `${isServerside ? base_server : base}product-search/${version}/marketplace/category`,
      );
      const response = res.data.marketPlaceCategories.map(
        ({ keywords, categoryId, category, sortOrder, subCategory }) => ({
          keywords,
          categoryId,
          category: category[lang],
          sortOrder,
          subCategory: subCategory.map(
            ({
              subCategoryId,
              sortOrder,
              productCatalogId,
              isExternalLink,
              productSubCategoryTitle,
              productCategoryLongDescription,
              banner,
            }) => ({
              subCategoryId,
              sortOrder,
              productCatalogId,
              isExternalLink,
              productSubCategoryTitle: productSubCategoryTitle[lang],
              productSubCategoryShortDescription: productCategoryLongDescription[lang],
              banner: banner[lang],
            }),
          ),
        }),
      );

      return response;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/marketplace'`, error.message);
      return [];
    }
  },
  getMarketplaceAdvantages: async (subcategory: string, lang: string, isServerside = false) => {
    try {
      const res = await axios.get(
        `${isServerside ? base_server : base
        }product-search/${version}/marketplace/category/by-subcategory-id/${subcategory}`,
      );
      const response = res.data.subCategory.map(
        ({
          keywords,
          subCategoryId,
          productCatalogId,
          productSubCategoryTitle,
          productCategoryLongDescription,
          isExternalLink,
          provider,
          providerUrl,
          banner,
          advantages,
        }) => ({
          keywords,
          subCategoryId,
          productCatalogId,
          productSubCategoryTitle: productSubCategoryTitle[lang],
          productSubCategoryShortDescription: productCategoryLongDescription[lang],
          isExternalLink,
          provider,
          providerUrl,
          banner: banner !== null ? banner[lang] : null,
          advantages: advantages.map(
            ({
              advantageId,
              productCategoryAdvantageTitle,
              productCategoryAdvantageDescription,
              icon,
            }) => ({
              advantageId,
              productCategoryAdvantageTitle: productCategoryAdvantageTitle[lang],
              productCategoryAdvantageDescription: productCategoryAdvantageDescription[lang],
              icon,
            }),
          ),
        }),
      );

      return response;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/marketplaceadv'`, error.message);
      return [];
    }
  },
  getMarketplacePrebuildOffers: async (subcategory: string, lang: string) => {
    try {
      const params = { offset: 0, limit: 10 };
      const res = await axios.get(
        `${base}product-search/${version}/marketplace/by-subcategory-id/${subcategory}`,
        { params },
      );
      const response = res.data.marketPlaceProducts.map(
        ({ keywords, productId, basic, price, discount, specification }) => ({
          keywords,
          productId,
          productName: basic.productName,
          description: basic.productDescription[lang],
          displayItemCode: basic.displayItemCode,
          price: price.unitPriceMURMonth,
          discount: discount.discount,
          otherAttributes: specification.otherAttributes.map(({ name, value }) => ({
            attributeName: name,
            attributeVal: value,
          })),
        }),
      );

      return response;
    } catch (error) {
      console.error(`🚀 ${error.name} in 'api/marketplaceprebuild'`, error.message);
      return [];
    }
  },
});
