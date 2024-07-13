/**
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: 26 September 2022, 16:03
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { authHeader } from 'api';

/* eslint-disable import/no-anonymous-default-export */
export default (axios, version: string, base: string) => {
    const config = {
        headers: authHeader,
    };

    return {
        updateIndividualUser: async (formData) => {
            try {
                const res = await axios.put(`${base}user/${version}/user/individual`, formData, config);
                return res;
            } catch (error) {
                console.error(`🚀 ${error.name} in 'api/updateIndividual'`, error.message);
                return error;
            }
        },
        updateEnterpriseUser: async (formData) => {
            try {

                const res = await axios.put(`${base}user/${version}/user/enterprise`, formData, config);
                return res;
            } catch (error) {
                console.error(`🚀 ${error.name} in 'api/updateEnterprise'`, error.message);
                return error;
            }
        },
    };
};

