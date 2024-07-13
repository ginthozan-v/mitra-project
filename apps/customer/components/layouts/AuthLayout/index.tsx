/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 21 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import type { PropsReactChildren } from '@mtcloud/globals/types';
import FooterBasic from 'components/molecules/footers/Basic';
import LangSwitch from 'components/molecules/LangSwitch';
import { IMG_AUTH_BG, IMG_LOGO } from 'constants/images';
import { ROUTE_HOME } from 'constants/routes';
import Link from 'next/link';
import router from 'next/router';
import { useEffect } from 'react';
import { isLoggedIn } from 'utils/auth';

const AuthLayout = ({ children }: PropsReactChildren) => {
  useEffect(() => {
    if (isLoggedIn()) {
      router.push(ROUTE_HOME);
    }
  }, []);
  if (isLoggedIn()) {
    return null;
  }
  return (
    <div
      className='min-h-screen flex flex-col'
      style={{ backgroundImage: `url(${IMG_AUTH_BG})`, backgroundPosition: 'left top', backgroundSize: 'auto 1500px' }}
    >
      <div className='grow grid place-items-center px-3 py-5'>
        <div className='max-w-3xl w-full min-h-[50%] rounded-md bg-white/75 box-shadow overflow-hidden' style={{ backdropFilter: 'blur(5px)' }}>
          <div className='shadow flex items-center p-3 md:p-4'>
            <Link href={ROUTE_HOME}>
              <a>
                <img src={IMG_LOGO.src} alt={IMG_LOGO.alt} className='h-10 md:h-14' />
              </a>
            </Link>
            <div className='grow' />
            <div className='mr-6'>
              <LangSwitch isMobile={false} menuStyle='px-3' />
            </div>
          </div>

          <div className='flex flex-col items-center pb-5'>{children}</div>
        </div>
      </div>

      <FooterBasic />
    </div>
  );
};

export default AuthLayout;
