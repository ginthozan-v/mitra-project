/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Tuesday, 19 June 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

/* eslint-disable import/no-anonymous-default-export */
export default (axios, version: string, base: string, base_server: string) => ({
    getAllPrimaryMenu: async () => {
        try {

            const params = { pageNo: 0, pageSize: 5, sortBy: 'id', sortDir: 'asc' }
            const res = await axios.get(`${base}content/${version}/primary-menu/all`, { params });
            return res.data.content;
        } catch (error) {

            return []
        }
    },
    getAllHeroBanner: async (lang: string, isServerside = false) => {
        try {
            const params = { pageNo: 0, pageSize: 100, sortBy: 'id', sortDir: 'asc' }
            const res = await axios.get(`${isServerside ? base_server : base}content/${version}/hero-banner/all`, { params });
            const response = res.data.content.map(({ id, title, images, priority, startDateTime, endDateTime, redirectionLink, active }) => ({
                id, title,
                images: images.map(({ banner, bannerSize }) => ({ banner: banner[lang], bannerSize })),
                priority, startDateTime, endDateTime, redirectionLink: redirectionLink[lang], active
            }))

            return response
        } catch (error) {

            return []
        }
    },

    getFeaturedProducts: async (lang: string, isServerside = false) => {
        try {
            const params = { lite: false, offset: 0 }
            const res = await axios.get(`${isServerside ? base_server : base}content/${version}/featured`, { params });

            const response = res.data.featuredProducts.map(({ id, productId, type, icon, displayName, solutionIndustry, shortDescription, priority, scheduleStart, scheduleEnd, isActive }) => ({
                id,
                productId,
                type,
                icon,
                displayName: displayName[lang],
                solutionIndustry: solutionIndustry !== null ? solutionIndustry[lang] : '',
                shortDescription: shortDescription[lang],
                priority, startDateTime: scheduleStart, endDateTime: scheduleEnd, active: isActive
            }))

            return response
        } catch (error) {

            return []
        }
    },
    getAllLoyalty: async (lang: string, isServerside = false) => {
        try {
            const params = { pageNo: 0, pageSize: 100, sortBy: 'id', sortDir: 'asc' }
            const res = await axios.get(`${isServerside ? base_server : base}content/${version}/loyalty/all`, { params });
            const response = res.data.content.map(({ id, title, subTitle, label, shortDescription, deepLinkName, deepLink, image, active }) => ({
                id,
                title: title[lang],
                subTitle: subTitle[lang],
                label: label[lang],
                shortDescription: shortDescription[lang],
                deepLinkName: deepLinkName[lang],
                deepLink: deepLink[lang],
                image: image[lang],
                active
            }))

            return response
        } catch (error) {
            console.log('error loyalty', error.message)
            return []
        }
    },
    getAllPromotions: async (lang: string, isServerside = false) => {
        try {
            const params = { pageNo: 0, pageSize: 100, sortBy: 'id', sortDir: 'asc' }
            const res = await axios.get(`${isServerside ? base_server : base}content/${version}/promotionalOffer/all`, { params });
            const response = res.data.content.map(({ id, title, subTitle, label, shortDescription, deepLinkName, deepLink, image, active }) => ({
                id,
                title: title[lang],
                subTitle: subTitle[lang],
                label: label[lang],
                shortDescription: shortDescription[lang],
                deepLinkName: deepLinkName[lang],
                deepLink: deepLink[lang],
                image: image[lang],
                active
            }))

            return response
        } catch (error) {

            return []
        }
    },

    getAllSocialMedia: async () => {
        try {
            const params = { pageNo: 0, pageSize: 100, sortBy: 'id', sortDir: 'asc' }
            const res = await axios.get(`${base}content/${version}/social-media-redirections/all`, { params });

            return res.data.content
        } catch (error) {

            return []
        }
    },


});
