/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 15 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import type { PropsReactChildren } from '@mtcloud/globals/types';
import FooterBasic from 'components/molecules/footers/Basic';
import TopStack from 'components/molecules/headers/TopStack';

const MainLayout = ({ children }: PropsReactChildren) => {
  return (
    <>
      {/* <TopStack /> */}
      <main className='min-h-screen flex flex-col mb-[52px] sm:mb-0 bg-[#FAFAFC]'>
        <div className='mt-16 sm:mt-[calc(7rem+1px)] grow'>{children}</div>
        <FooterBasic />
      </main>
    </>
  );
};

export default MainLayout;
