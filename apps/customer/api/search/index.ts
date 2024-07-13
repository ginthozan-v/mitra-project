/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Tuesday, 02 August 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

/* eslint-disable import/no-anonymous-default-export */
export default (axios, version: string, base: string) => ({
    search: async (keyword: string, lang: string, offset: number, limit: number) => {
        try {
            const params = `keyword=${keyword}&offset=${offset}&limit=${limit}`
            const res = await axios.get(`${base}product-search/${version}/global-search?${params}`);

            const response = [{
                total: res.data.totalCount,
                results: res.data.results.map(({ id, title, category, description, solutionIndustry, productType, level2Id, level }) => ({
                    id: level2Id,
                    title: title[lang],
                    category: category === null ? null : category[lang],
                    solutionIndustry: solutionIndustry !== null ? solutionIndustry[lang] : '',
                    description: description[lang],
                    productType,
                    productId: id,
                    type: level
                }))
            }]

            return response
        } catch (error) {

            return []
        }
    },


});
