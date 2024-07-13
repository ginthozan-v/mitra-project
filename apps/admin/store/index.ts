/**
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: 14 November 2022, 12:02
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import create from 'zustand'

const useStore = create((set: any) => ({
  online: true,
  setOnline: (online: boolean) => set((state) => ({ online })),

}));

export default useStore;