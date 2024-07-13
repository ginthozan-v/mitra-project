/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Friday, 08 July 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */


/* eslint-disable import/no-anonymous-default-export */
export default (axios, version: string, base: string, base_server: string) => ({
    getIndustries: async (expand: string, isServerside = false) => {
        try {

            const params = { expand: expand }
            const res = await axios.get(`${isServerside ? base_server : base}product-search/${version}/solution`, { params });
            const response = res.data.solutions.map(({
                keywords,
                solutionId,
                solutionIndustry,
                solutionBanner,
                solutionTitle,
                solutionDescription,
                solutionImage,
                solutionImageDescription,
                solutionAdditionalSubTitle,
                solutionAdditionalLinkName,
                solutionAdditionalInfoLink,
                sortOrder,
                solutionSubList, }) => ({
                    keywords,
                    solutionId,
                    solutionIndustry,
                    solutionBanner,
                    solutionTitle,
                    solutionDescription,
                    solutionImage,
                    solutionImageDescription,
                    solutionAdditionalSubTitle,
                    solutionAdditionalLinkName,
                    solutionAdditionalInfoLink,
                    sortOrder,
                    solutionSubList: solutionSubList.map(
                        ({ id, solutionSubTitle, solutionSubIcon, solutionSubDescription }) => ({
                            id,
                            solutionSubIcon,
                            solutionSubTitle,
                            solutionSubDescription
                        }),
                    ),
                }))
            return response
        } catch (error) {
            console.error(`🚀 ${error.name} in 'api/solutions'`, error.message);
            return []
        }
    },

});
