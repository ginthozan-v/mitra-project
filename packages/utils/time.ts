/*
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: Monday, 7 March 2022 08:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
export const getDisplayTime = () => {
    const date = new Date()
    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ];
}