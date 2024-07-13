/*
 * File: otp.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Thurseday, 16 June 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

export type otpData = {
  userId: string;
  type: 'sms' | 'email' | 'sms/email' | string;
  code?: string;
  action?: string;
};
