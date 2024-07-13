/**
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: 13 September 2022, 13:55
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

/* eslint-disable import/no-anonymous-default-export */
export default (axios, version: string, base: string, base_server: string) => ({

    getLatestNews: async (lang: string, isServerside = false) => {
        try {
            const params = { pageNo: 0, pageSize: 2000, sortBy: 'id', sortDir: 'desc' }
            const res = await axios.get(`${isServerside ? base_server : base}content/${version}/latest-news/all`, { params });

            const data = res.data.content.map(({ id, title, description, priority, redirectionLinkName, redirectionLink, image, active, updatedOn }) => ({
                id,
                title: title[lang],
                description: description[lang],
                priority,
                redirectionLinkName: redirectionLinkName[lang],
                redirectionLink: redirectionLink[lang],
                image,
                active,
                updatedOn
            }))

            return data
        } catch (error) {
            console.error(`🚀 ${error.name} in 'api/news'`, error.message);
            return []
        }
    },

});
