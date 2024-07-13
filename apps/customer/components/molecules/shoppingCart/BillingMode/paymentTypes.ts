/*
 * File: paymentTypes.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 20 April 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { BILLING_MODE } from '@/models';

const PaymentTypes = [
  {
    id: 1,
    paymentType: BILLING_MODE.PREPAID,
    label: 'Prepaid',
    notification: 'Credit note: PC001 $100.00 USD Applied',
    checked: true,
  },
  {
    id: 2,
    paymentType: BILLING_MODE.POSTPAID,
    label: 'Postpaid',
    notification: '',
    validation: '',
  },
];

export default PaymentTypes;
