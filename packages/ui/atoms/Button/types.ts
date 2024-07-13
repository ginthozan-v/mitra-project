/*
 * File: types.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 14 March 2022 10:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

export enum colors {
    skyBlue = 'bg-[#00aeef]',
    orange = 'bg-[#FFA400]',
    pureWhite = 'bg-[#FFFFFF]',
    lightGray = 'bg-gray-100',
    argent = 'bg-[#BFBFBF]'
}
export enum textStyle {
    semiboldMedium = 'font-semibold text-center text-base',
    semiboldSmall = 'font-semibold text-center text-sm'
}
export enum textColor {
    white = 'text-[#f2f3f4]',
    charcoal = 'text-[#474747]',
    orange = 'text-[#FFA400]'
}
export enum size {
    lg = 'w-28 h-14',//112,56
    md = 'w-80 md:w-96 h-12',//112,48
    sm = 'w-28 h-9',//112,36
    wf = 'w-full'
}
export enum border {
    rounded = 'rounded',
    roundedSolidOrange = 'rounded border-solid border-2 border-[#FFA400] box-border',
    roundedSolidSkyblue = 'rounded border-solid border-2 border-[#00AEEF] box-border',
    borderNone = 'border-none'
}
export type propTypes = {
    colorScheme: keyof typeof colors,
    textStyleScheme: keyof typeof textStyle,
    textColorScheme: keyof typeof textColor,
    sizeScheme: keyof typeof size,
    borderScheme: keyof typeof border,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    type?: 'submit' | 'reset' | 'button',
    disabled?: boolean,
    children: React.ReactNode,
    className?: string
}

