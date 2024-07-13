/**
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: 17 August 2022, 13:07
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

/* eslint-disable import/no-anonymous-default-export */
export default (axios, version: string, base: string, base_server: string) => ({

    getAllContactUs: async (lang: string, isServerside = false) => {
        try {
            const res = await axios.get(`${isServerside ? base_server : base}content/${version}/generic-content?position=CONTACT_US`);
            const response = JSON.parse(res.data.content.data)

            const data = {
                address: response.address,
                email: response.email,
                telephone: response.telephone,
                hotline: response.hotline
            }

            return data
        } catch (error) {
            console.error(`🚀 ${error.name} in 'api/contact us'`, error.message);
            return []
        }
    },
    getCategory: async (isServerside = false) => {
        try {
            const res = await axios.get(`${isServerside ? base_server : base}generic/${version}/contact/supportCategory`);


            return res.data.data.category
        } catch (error) {
            console.error(`🚀 ${error.name} in 'api/contactuscat'`, error.message);
            return []
        }
    },
    saveData: async (data) => {
        try {

            await axios.post(`${base}generic/${version}/contact/contactUs`, data);

            return true
        } catch (error) {
            console.error(`🚀 ${error.name} in 'api/contactussave'`, error.message);
            return error.code
        }
    },

});
