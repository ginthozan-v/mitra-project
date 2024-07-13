/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 22 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import type { PropsReactChildren } from '@mtcloud/globals/types';
import FooterHome from 'components/molecules/footers/Home';

const LayoutHome = ({ children }: PropsReactChildren) => {
  return (
    <>
      <main className='min-h-screen flex flex-col bg-[#FAFAFC]'>
        <div className='mt-16 sm:mt-[calc(7rem+1px)] grow'>{children}</div>
        <FooterHome />
      </main>
    </>
  );
};

export default LayoutHome;
