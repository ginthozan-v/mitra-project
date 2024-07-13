/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 20 July 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { getAuth } from "utils/auth";
import { authHeader } from 'api';

const accessToken = getAuth();

/* eslint-disable import/no-anonymous-default-export */
export default (axios, version: string, base: string) => {
    const config = {
        headers: authHeader,
    };
    return {
        getAlertNotifications: async (statuses: string, offset: number, limit: number, lang: string, categories: string, acknowledged?: boolean,) => {
            try {
                const res = await axios.get(`${base}notification/${version}/notification/alert`, { ...config, params: { statuses, offset, limit, categories, acknowledged } });
                return res.data
            } catch (error) {

                return error
            }
        },
        updateAcknowledge: async (id: number) => {
            try {

                const res = await axios.patch(`${base}notification/${version}/notification/alert/${id}/acknowledge`, {}, config);
                return res.data.error_code
            } catch (error) {
                return error.code
            }
        },
        updateStatus: async (id: number, status: string) => {
            try {

                const params = `id=${id}`
                const body = { status: status }
                const res = await axios.patch(`${base}notification/${version}/notification/alert?${params}`, body, {
                    headers: {
                        "Authorization": `Bearer ${accessToken['access_token']}`
                    }
                });
                return res.data.error_code
            } catch (error) {
                return error.code
            }
        },
        updateStatusAll: async (status: string) => {
            try {

                const body = { status: status }
                const res = await axios.patch(`${base}notification/${version}/notification/alert/mark-all`, body, {
                    headers: {
                        "Authorization": `Bearer ${accessToken['access_token']}`
                    }
                });
                return res.data.error_code
            } catch (error) {
                return error.code
            }
        },
        deleteNotification: async (id: number) => {
            try {

                const res = await axios.delete(`${base}notification/${version}/notification/alert/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken['access_token']}`
                    }
                });
                return res.data.error_code
            } catch (error) {
                return error.code
            }
        },
        deleteAll: async () => {
            try {

                const res = await axios.delete(`${base}notification/${version}/notification/alert/delete-all`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken['access_token']}`
                    }
                });
                return res.data.error_code
            } catch (error) {
                return error.code
            }
        },
    }


};
