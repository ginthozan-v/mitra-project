/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 20 June 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { otpData } from 'constants/registration/otp';
import { passwordData } from 'constants/registration/password';
import { authHeader } from 'api';

/* eslint-disable import/no-anonymous-default-export */
export default (axios, version: string, base: string) => {
  const config = {
    headers: authHeader,
  };
  return {
    getCountryList: async (lang: string) => {
      try {
        const params = { pageNo: 0, pageSize: 2000, sortBy: 'nameEn', sortDir: 'asc' };
        const res = await axios.get(`${base}content/${version}/country/all`, { params });
        const response = res.data.content.map(({ id, countryCode, flag, name }) => ({
          id,
          countryCode,
          flag,
          countryName: name[lang],
        }));

        return response;
      } catch (error) {
        console.error(`🚀 ${error.name} in 'api/countries'`, error.message);
        return [];
      }
    },
    verifyEmail: async (email: string) => {
      try {
        const res = await axios.get(`${base}user/${version}/user/by-email-address/${email}`);
        if (res.data.userExists) {
          return false;
        } else return true;
      } catch (error) {
        return false;
      }
    },
    verifyEmailExist: async (email: string) => {
      try {
        const res = await axios.get(`${base}user/${version}/user/email/${email}`);
        if (res.data.userExists) {
          return false;
        } else return true;
      } catch (error) {
        return false;
      }
    },
    init: async (formFields) => {
      try {
        const userId = await axios.post(`${base}user/${version}/user/register/init`, formFields);

        return userId.data;
      } catch (error) {
        return 'Failed user data saving';
      }
    },
    update: async (formFields, userId: string) => {
      try {
        const res = await axios.put(`${base}user/${version}/user/register/${userId}`, formFields);

        return res.data;
      } catch (error) {
        return 'Failed user data saving';
      }
    },

    verifyOTP: async (otp: otpData) => {
      try {
        await axios.post(`${base}otp/${version}/otp/verify`, otp);

        return true;
      } catch (error) {
        return false;
      }
    },
    // otpInit: async (type: string, value: string, userId: string, action: string) => {
    //   try {
    //     const params = { type: type, value: value, userId: userId, action: action };

    //     await axios.get(`${base}otp/${version}/otp/generate`, { params });

    //     return true;
    //   } catch (error) {
    //     return false;
    //   }
    // },
    otpInit: async (payload) => {
      try {


        await axios.post(`${base}user/${version}/otp`, payload);

        return true;
      } catch (error) {
        return error;
      }
    },
    otpResend: async (otp: otpData) => {
      try {
        await axios.post(`${base}otp/${version}/otp/resend`, otp);

        return true;
      } catch (error) {
        return false;
      }
    },
    passwordSubmit: async (password: passwordData) => {
      try {
        await axios.post(`${base}user/${version}/user/register/submit`, password);
        return true;
      } catch (error) {
        if (error.response.data.error_code === 'USER_PARTIALLY_CREATED') {
          return 'USER_PARTIALLY_CREATED'
        }
        else {
          return false;
        }

      }
    },
    resetPassword: async (password) => {
      try {
        await axios.post(`${base}user/${version}/user/password`, password, config);
        return true;
      } catch (error) {

        return error.code;


      }
    },
    getUser: async () => {
      try {
        const res = await axios.get(`${base}user/${version}/user`, config);
        return res.data;
      } catch (error) {
        return error.code;
      }
    },
  };
};
