/*
 * File: badge/types.ts
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 07 April 2022 03:16 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

export enum colors {
    default = 'bg-blue-100 text-blue-800',
    dark = 'bg-gray-100 text-gray-800',
    danger = 'bg-red-100 text-red-800',
    success = 'bg-green-100 text-green-800',
    alert = 'bg-yellow-100 text-yellow-800',
}

export type propTypes = {
    type: keyof typeof colors,
    value: string
}