
/*
 * File: samplePayload.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 18 April 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */



const samplePayload = Array(2).fill(0).map((_, i) => ({
    id: i,
    title: 'General Computing-plus C6 ECS',
    subTitle: 'c6.large.2(2vCPUs|4GiB)',
    billingMode: 'Monthly',
    duration: '6 months',
    quantity: 1,
    price: '$100 month',
    promotion: '$100 USD/month(10% off)',
    offerName: 'Offer Name',
    promoCode: 'PC002',
}))


export default samplePayload
