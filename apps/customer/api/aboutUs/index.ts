/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 20 June 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

/* eslint-disable import/no-anonymous-default-export */
export default (axios, version: string, base: string, base_server: string) => ({
    getAllAboutus: async (lang: string, isServerside = false) => {
        try {
            const res = await axios.get(
                `${isServerside ? base_server : base
                }content/${version}/generic-content?position=ABOUT_US`,
            );
            const response = JSON.parse(res.data.content.data);

            const data = {
                section_title: response.section_title.sectionTitle[lang],
                mission: {
                    title: response.mission.missionTitle[lang],
                    img: response.mission.missionIcon,
                    desc: response.mission.missionDescription[lang],
                },
                vision: {
                    title: response.vision.visionTitle[lang],
                    img: response.vision.visionIcon,
                    desc: response.vision.visionDescription[lang],
                },
                motto: {
                    title: response.motto.mottoTitle[lang],
                    img: response.motto.mottoIcon,
                    desc: response.motto.mottoDescription[lang],
                },
                profileSectionTitle: response.company_profile.profileSectionTitle[lang],
                profileSectionDescription: response.company_profile.profileSectionDescription[lang],
                redirectionTitle: response.redirection_link.redirectionTitle[lang],
                redirection_link: response.redirection_link.redirectionLink[lang],
            };

            return data;
        } catch (error) {
            console.error(`🚀 ${error.name} in 'api/aboutus'`, error.message);
            return [];
        }
    },
});
