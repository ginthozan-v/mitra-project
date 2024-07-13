
/*
* File: samplePayload.ts
* Project: MT Cloud Portal
* Author: Dilum Sanjaya (dranasinghe@mitrai.com)
* File Created: 1 April 2022 12:00 pm
* Module: MT Cloud Portal Frontend
* Copyright 2022 - 2022 Mitra Innovation Ltd.
*/



const samplePayload = Array(4).fill(0).map((_, i) => ({
    id: i,
    title: 'General Computing-plus C6 ECS',
    subTitle: 'c6.large.2(2vCPUs|4GiB)',
    billingMode: 'Monthly',
    duration: '6 months',
    quantiity: 1,
    price: '$90 USD/month',
    promotion: '$100 USD/month(10% off)'
}))





export default samplePayload
