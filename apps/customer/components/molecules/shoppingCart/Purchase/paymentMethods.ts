
/*
 * File: paymentMethods.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Thursday, 21 April 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */



const paymentMethods = [
    {
        id: 1,
        method: 'Mastercard',
        gateway: 'ipay',
        currency: 'MUR USD EUR',
        sample: '****   1234',
        imageUrl: '/mastercard.png'
    },
    {
        id: 2,
        method: 'VISA',
        gateway: 'ipay',
        currency: 'MUR USD EUR',
        sample: '****   1234',
        imageUrl: '/visa.png'
    },
    {
        id: 3,
        method: 'MY.T. Money',
        gateway: 'mytmoney',
        currency: 'MUR',
        sample: 'Express Checkout',
        imageUrl: null
    },]





export default paymentMethods
