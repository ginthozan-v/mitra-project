/*
 * File: types.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 16 March 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

export enum colors{
    sunset='bg-gradient-to-r from-[#ec008c] to-[#ffa400]',
    sunset50='bg-gradient-to-r from-[#F780C6] to-[#FFD380]',
    skyBlue='bg-[#00aeef]',
    orange='bg-[#FFA400]',
    pureWhite='bg-[#FFFFFF]',
    inherit='bg-inherit'
}
export type types = {
    colorScheme: keyof typeof colors,
    children:React.ReactNode
}