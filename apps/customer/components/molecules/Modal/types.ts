/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 30 March 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { Dispatch, SetStateAction } from "react"

export type modalTypes = {
    content: string,
    heading: string,
    showModal: boolean,
    cssClass?: string,
    setShowModal: Dispatch<SetStateAction<boolean>>
}