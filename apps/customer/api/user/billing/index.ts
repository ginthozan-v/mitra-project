/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Friday, 08 July 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { getAuth } from 'utils/auth';

const accessToken = getAuth();

/* eslint-disable import/no-anonymous-default-export */
export default (axios, version: string, base: string) => ({
  getDashboardResources: async () => {
    try {
      const res = await axios.get(`${base}billing/${version}/subscription/resources`, {
        headers: {
          Authorization: `Bearer ${accessToken['access_token']}`,
        },
      });

      return res;
    } catch (error) {
      return error.code;
    }
  },
  getCategories: async (lang: string, expired: boolean) => {
    try {
      const params = `expired=${expired}`;
      const res = await axios.get(`${base}billing/${version}/subscription/product/category?${params}`, {
        headers: {
          Authorization: `Bearer ${accessToken['access_token']}`,
        },
      });
      const respone = res.data.categories.map(({ id, title, purchasedProductCount }) => ({
        id,
        title: title[lang],
        purchasedProductCount,
      }));

      return respone;
    } catch (error) {
      return [];
    }
  },

  getPurchacedProducts: async (offset: number, limit: number, categoryId: string, expired: boolean, lang: string) => {
    try {
      let params;

      if (expired === null && categoryId === null) {
        params = `offset=${offset}&limit=${limit}`;
      } else if (expired === null) {
        params = `categoryId=${categoryId}&offset=${offset}&limit=${limit}`;
      } else if (categoryId === null) {
        params = `offset=${offset}&limit=${limit}&expired=${expired}`;
      } else {
        params = `categoryId=${categoryId}&offset=${offset}&limit=${limit}&expired=${expired}`;
      }

      const res = await axios.get(`${base}billing/${version}/subscription/product?${params}`, {
        headers: {
          Authorization: `Bearer ${accessToken['access_token']}`,
        },
      });

      const count = res.data.totalCount;
      const data = res.data.results.map(
        ({
          purchasedOn,
          productName,
          billingType,
          billingMode,
          specification,
          unitPrice,
          validUntil,
          purchasedProductId,
          productId,
          status,
          rating,
          ratingDescription,
          currency,
        }) => ({
          purchasedOn,
          productName: productName[lang],
          billingType: billingType[lang],
          billingMode: billingMode[lang],
          specification,
          unitPrice: currency.symbol + ' ' + unitPrice,
          validUntil,
          purchasedProductId,
          productId,
          status,
          rating,
          ratingDescription,
        }),
      );
      const respone = [{ count: count, data: data }];
      return respone;
    } catch (error) {
      return error.code;
    }
  },
  getProductRatings: async (productId: string, lang: string) => {
    try {
      const res = await axios.get(`${base}product-search/${version}/product/rating/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken['access_token']}`,
        },
      });

      return res.data.ratings;
    } catch (error) {
      return [];
    }
  },

  saveProductRatings: async (ratings) => {
    try {
      const res = await axios.post(`${base}product-search/${version}/product/rating`, ratings, {
        headers: {
          Authorization: `Bearer ${accessToken['access_token']}`,
        },
      });
      if (res.data.error_code === '201') {
        return true;
      } else return false;
    } catch (error) {
      return false;
    }
  },
  getBillingCycles: async () => {
    try {
      const res = await axios.get(`${base}billing/${version}/billing/history/billing-cycle`, {
        headers: {
          Authorization: `Bearer ${accessToken['access_token']}`,
        },
      });

      const response = res.data.billingCycles.map(({ cycle, displayText }) => ({ id: cycle, title: displayText }));

      return response;
    } catch (error) {
      return error.code;
    }
  },

  getBillingHistory: async (offset: number, limit: number, billingCycle: string, keyword: string, lang: string) => {
    try {
      if (billingCycle === null) {
        return [];
      }
      let params;
      if (keyword === null) {
        params = `offset=${offset}&limit=${limit}&billingCycle=${billingCycle}&timeZone=%2B05%3A30`;
      } else {
        params = `offset=${offset}&limit=${limit}&billingCycle=${billingCycle}&timeZone=%2B05%3A30&keyword=${keyword}`;
      }

      const res = await axios.get(`${base}billing/${version}/billing/history?${params}`, {
        headers: {
          Authorization: `Bearer ${accessToken['access_token']}`,
        },
      });

      const respone = [
        {
          records: res.data.records.map(
            ({ id, billingReferenceId, dateOfBill, billNumber, billingMode, currency, subTotal, discount, vat, total }) => ({
              id,
              billingReferenceId,
              dateOfBill,
              billNumber,
              billingMode: billingMode[lang],
              currency: currency.code,
              subTotal: currency.symbol + ' ' + subTotal,
              discount: currency.symbol + ' ' + discount,
              vat: currency.symbol + ' ' + vat,
              total: currency.symbol + ' ' + total,
            }),
          ),
          total: res.data.total.map(({ currency, value }) => ({
            currency: currency.symbol,
            value,
          })),
          discount: res.data.discount.map(({ currency, value }) => ({
            currency: currency.symbol,
            value,
          })),
          totalCount: res.data.totalCount,
        },
      ];

      return respone;
    } catch (error) {
      return error.code;
    }
  },

  getBillingReceipt: async (billingReferenceId: string, lang: string) => {
    try {
      const res = await axios.get(`${base}billing/${version}/billing/bill/${billingReferenceId}`, {
        headers: {
          Authorization: `Bearer ${accessToken['access_token']}`,
        },
      });
      let response;

      if (getAuth().userType === 'individual') {
        response = [
          {
            billingMode: res.data.userBill.billingMode,
            dateOfBill: res.data.userBill.dateOfBill,
            billFrom: res.data.userBill.billFrom,
            billTo: res.data.userBill.billTo,
            name: res.data.userBill.firstName + ' ' + res.data.userBill.lastName,
            email: res.data.userBill.email,
            billNumber: res.data.userBill.billNumber,
            billingAccountNumber: res.data.userBill.billingAccountNumber,
            fixedLineNumber: res.data.userBill.fixedLineNumber,
            subTotal: res.data.userBill.currency?.symbol + ' ' + res.data.userBill.subTotal,
            vat: res.data.userBill.currency?.symbol + ' ' + res.data.userBill.vat,
            creditNoteId: res.data.userBill.creditNoteId,
            creditNoteAmount: res.data.userBill.creditNoteCurrency?.symbol + ' ' + res.data.userBill.creditNoteAmount,
            discount: res.data.userBill.currency?.symbol + ' ' + res.data.userBill.discount,
            total: res.data.userBill.currency?.symbol + ' ' + res.data.userBill.total,
            paymentDueDate: res.data.userBill.paymentDueDate,
            currency: res.data.userBill.currency.code,
            isIndividual: true,
            billedProducts: res.data.userBill.billedProducts.map(({ productName, specification, billingType, quantity, unitPrice, subTotal }) => ({
              productName,
              specification,
              billingType: billingType[lang],
              quantity,
              unitPrice: res.data.userBill.currency?.symbol + ' ' + unitPrice,
              subTotal: res.data.userBill.currency?.symbol + ' ' + subTotal,
            })),
          },
        ];
      } else {
        response = [
          {
            billingMode: res.data.userBill.billingMode,
            dateOfBill: res.data.userBill.dateOfBill,
            billFrom: res.data.userBill.billFrom,
            billTo: res.data.userBill.billTo,
            name: res.data.userBill.firstName + ' ' + res.data.userBill.lastName,
            email: res.data.userBill.email,
            billNumber: res.data.userBill.billNumber,
            billingAccountNumber: res.data.userBill.billingAccountNumber,
            fixedLineNumber: res.data.userBill.fixedLineNumber,
            subTotal: res.data.userBill.currency?.symbol + ' ' + res.data.userBill.subTotal,
            vat: res.data.userBill.currency?.symbol + ' ' + res.data.userBill.vat,
            creditNoteId: res.data.userBill.creditNoteId,
            creditNoteAmount: res.data.userBill.currency?.symbol + ' ' + res.data.userBill.creditNoteAmount,
            discount: res.data.userBill.currency?.symbol + ' ' + res.data.userBill.discount,
            total: res.data.userBill.currency?.symbol + ' ' + res.data.userBill.total,
            paymentDueDate: res.data.userBill.paymentDueDate,
            currency: res.data.userBill.currency.code,
            brn: res.data.userBill.brn,
            companyName: res.data.userBill.companyName,
            isIndividual: false,
            billedProducts: res.data.userBill.billedProducts.map(({ productName, specification, billingType, quantity, unitPrice, subTotal }) => ({
              productName,
              specification,
              billingType: billingType[lang],
              quantity,
              unitPrice: unitPrice,
              subTotal: res.data.userBill.currency?.symbol + ' ' + subTotal,
            })),
          },
        ];
      }

      return response;
    } catch (error) {
      return error.code;
    }
  },

  downloadBill: async (billingReferenceId: string) => {
    try {
      const res = await axios.get(`${base}billing/${version}/billing/bill/${billingReferenceId}/download`, {
        headers: {
          Authorization: `Bearer ${accessToken['access_token']}`,
        },
        responseType: 'blob',
      });

      return res.data;
    } catch (error) {
      return [];
    }
  },
  getStartDate: async () => {
    try {
      const res = await axios.get(`${base}billing/${version}/payment/start-date`, {
        headers: {
          Authorization: `Bearer ${accessToken['access_token']}`,
        },
      });

      return res.data;
    } catch (error) {
      return error.message;
    }
  },
  getPaymentHistory: async (offset: number, limit: number, keyword: string, startDate: string, endDate: string, lang: string) => {
    try {
      8;
      let params;
      if (keyword === null) {
        params = `offset=${offset}&limit=${limit}&from=${startDate}&to=${endDate}`;
      } else {
        params = `offset=${offset}&limit=${limit}&from=${startDate}&to=${endDate}&keyword=${keyword}`;
      }

      const res = await axios.get(`${base}billing/${version}/payment/history?${params}`, {
        headers: {
          Authorization: `Bearer ${accessToken['access_token']}`,
        },
      });

      const respone = [
        {
          records: res.data.records.map(
            ({ orderId, receiptNumber, transactionDate, billNumber, paymentMethod, currency, transactionType, transactionAmount }) => ({
              orderId: orderId,
              transactionDate: transactionDate,
              billNumber,
              receiptNumber: receiptNumber,
              paymentMethod: paymentMethod[lang],
              transactionType: transactionType[lang],
              currency: currency.code,
              transactionAmount: currency.symbol + ' ' + transactionAmount,
            }),
          ),
          total: res.data.total.map(({ currency, value }) => ({
            currency: currency.symbol,
            value,
          })),
          totalCount: res.data.totalCount,
        },
      ];
      return respone;
    } catch (error) {
      return [];
    }
  },
  getTransactionReceipt: async (receiptNumber: string, lang: string) => {
    try {
      const res = await axios.get(`${base}billing/${version}/payment/receipt/${receiptNumber}`, {
        headers: {
          Authorization: `Bearer ${accessToken['access_token']}`,
        },
      });

      let response;
      if (getAuth().userType === 'individual') {
        response = [
          {
            name: res.data.userReceipt.firstName + ' ' + res.data.userReceipt.lastname,
            email: res.data.userReceipt.email,
            transactionDate: res.data.userReceipt.transactionDate,
            receiptNumber: res.data.userReceipt.receiptNumber,
            billNumber: res.data.userReceipt.billNumber,
            paymentMethod: res.data.userReceipt.paymentMethod[lang],
            transactionType: res.data.userReceipt.transactionType[lang],
            currency: res.data.userReceipt.currency.code,
            transactionAmount: res.data.userReceipt.currency.symbol + ' ' + res.data.userReceipt.transactionAmount,
          },
        ];
      } else {
        response = [
          {
            name: res.data.userReceipt.firstName + ' ' + res.data.userReceipt.lastname,
            email: res.data.userReceipt.email,
            transactionDate: res.data.userReceipt.transactionDate,
            receiptNumber: res.data.userReceipt.receiptNumber,
            billNumber: res.data.userReceipt.billNumber,
            paymentMethod: res.data.userReceipt.paymentMethod[lang],
            transactionType: res.data.userReceipt.transactionType[lang],
            currency: res.data.userReceipt.currency.code,
            transactionAmount: res.data.userReceipt.currency.symbol + ' ' + res.data.userReceipt.transactionAmount,
            brn: res.data.userReceipt.brn,
            companyName: res.data.userReceipt.companyName,
          },
        ];
      }

      return response;
    } catch (error) {
      return error.code;
    }
  },
  downloadTransactionReceipt: async (receiptNumber: string) => {
    try {
      const res = await axios.get(`${base}billing/${version}/payment/receipt/${receiptNumber}/download`, {
        headers: {
          Authorization: `Bearer ${accessToken['access_token']}`,
        },
        responseType: 'blob',
      });

      return res.data;
    } catch (error) {
      return [];
    }
  },

  downloadPaymentReceipt: async (paymentRef: string) => {
    try {
      const res = await axios.get(`${base}billing/${version}/payment/receipt/${paymentRef}/download`, {
        headers: {
          Authorization: `Bearer ${accessToken['access_token']}`,
        },
        responseType: 'blob',
      });

      return res.data;
    } catch (error) {
      return [];
    }
  },
});
