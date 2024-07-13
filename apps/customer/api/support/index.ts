/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: Monday, 01 August 2022 05:33 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { Axios, AxiosResponse } from 'axios';
import { authHeader } from 'api';
import { SupportTicket, SupportTicketListItem } from 'types';
import qs from 'querystring';

/* eslint-disable import/no-anonymous-default-export */
export default (axios: Axios, base: string) => {
  const config = {
    headers: authHeader,
  };

  return {
    createSupportTicket: async (payload: SupportTicket): Promise<AxiosResponse> => {
      try {
        const res = await axios.post(`${base}/cp/ticket`, payload, config);
        return res;
      } catch (error) {
        throw error;
      }
    },
    closeSupportTicket: async (supportTicketId: string): Promise<any> => {
      try {
        const res = await axios.delete(`${base}/resolve/${supportTicketId}`, config);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    findTicketsByUser: async (
      userId: string,
      offset: number,
      limit: number,
    ): Promise<[SupportTicketListItem] | any> => {
      try {
        const query = qs.stringify({
          expand: 'all',
          offset: offset,
          limit: limit,
        });
        // return [Ticket, Ticket];
        const res = await axios.get(`${base}/ticket/user/${userId}?${query}`, config);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    getTicket: async (supportTicketId: string): Promise<SupportTicketListItem | any> => {
      try {
        const res = await axios.get(`${base}/ticket/${supportTicketId}`, config);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    postMessage: async (body): Promise<any> => {
      try {
        const res = await axios.put(`${base}/ticket/message`, body, config);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    getTicketCategories: async (): Promise<any> => {
      try {
        const res = await axios.get(`${base}/categories`, config);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
  };
};

//#region Dummy data...
const Comments = {
  id: 'comment id',
  content: 'persion who is resolve the ticket is on leave',
  dateTime: 'date',
  user: {
    id: 'user_id',
    email: 'email@user.com',
    name: 'user_name',
  },
};

const Ticket = {
  id: 'id',
  dateTime: 'dateTime',
  supportCategory: 'supportCategory',
  supportSubCategory: 'supportSubCategory',
  createdVia: 'createdVia',
  mobileNumber: 'mobileNumber',
  status: 'status',
  user: {
    id: 'user_id',
    email: 'user_email',
    name: 'user_name',
  },
  comments: [Comments, Comments, Comments],
};
//#endregion Dummy data...
