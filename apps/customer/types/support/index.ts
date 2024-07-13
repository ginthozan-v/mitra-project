/**
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 15 August 2022, 17:46
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

 export type SupportTicket = {
  userId: string;
  supportCategory: string;
  supportSubCategory: string;
  mobileNumber: string;
  createdVia: string;
};

export type SupportTicketListItem = {
  id: string;
  dateTime: string;
  supportCategory: string;
  supportSubCategory: string;
  createdVia: string;
  mobileNumber: string;
  status: string;
  user: SupportTicketUser;
  comments: [SupportTicketComment];
};

export type SupportTicketUser = {
  id: string;
  email: string;
  name: string;
};

export type SupportTicketComment = {
  id: string,
  content: string,
  dateTime: string,
  user: {
      id: string,
      email: string,
      name: string
  }
};