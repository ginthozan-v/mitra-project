/*
 * File: types.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Tuesday, 15 March 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

export enum textColor {
    eerie_black = 'text-[#1a1a1a]',
    charcoal = 'text-[#474747]'

}
//need to add letter spacing,font
// export enum textStyle {
//     heading1 = 'text-8xl font-light item-center',//96px
//     heading2 = 'text-6xl font-light item-center',//60px
//     heading3 = 'text-5xl font-normal item-center',//48px
//     heading4 = 'text-4xl font-medium item-center',//36px
//     heading5 = 'text-2xl font-normal item-center',//24px
//     heading6 = 'text-xl font-normal item-center py-4',//20px
//     bodyRegular1 = 'text-base font-normal item-center',//16px
//     bodyHeavy1 = 'text-base font-semibold item-center',//16px
//     bodyRegular2 = 'text-sm font-normal item-center',//14px
//     bodyHeavy2 = 'text-sm font-semibold item-center',//14px
//     intro = 'text-lg font-light item-center',//18px
//     introSmall = 'text-base font-light item-center',//16px
//     headerMenu = 'text-xsm font-semibold item-center',//12px

// }
export enum textDeco {
    underline = 'underline'//links
}
export enum textType {
    h1 = 'h1',
    h2 = 'h2',
    h3 = 'h3',
    h4 = 'h4',
    h5 = 'h5',
    h6 = 'h6',
    bodyRegular1 = 'bodyRegular1',
    bodyHeavy1 = 'bodyHeavy1',
    bodyRegular2 = 'bodyRegular2',
    bodyHeavy2 = 'bodyHeavy2',
    intro = 'intro',
    introSmall = 'introSmall',
    menu = 'menu'
}


export type types = {
    textColorScheme: keyof typeof textColor,
    textTypeScheme: keyof typeof textType,
    children: React.ReactNode,
    className?: string

}

