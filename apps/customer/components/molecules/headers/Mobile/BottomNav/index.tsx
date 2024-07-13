/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Thursday, 28 April 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { LanguageIcon, LoginIcon, PriceTagIcon, UserAddIcon } from '@mtcloud/ui/atoms/icons';
import CurrencySwitch from 'components/molecules/CurrencySwitch';
import LangSwitch from 'components/molecules/LangSwitch';
import { ROUTE_REGISTER_ENTERPRISE } from 'constants/routes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { authNavigate, isLoggedIn } from 'utils/auth';

const BottomNav = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);
  return (
    <div className=''>
      <footer id='bottom-navigation' className='shrink-0 fixed inset-x-0 bottom-0 z-10 bg-white'>
        <div id='tabs' className='flex justify-around shadow'>
          {isAuthenticated ? null : (
            <div className='flex'>
              <a className='flex flex-row items-center py-4 pr-3' onClick={authNavigate}>
                <LoginIcon className='w-6 h-6 ml-2 text-skyBlue' />
                <span className='tab tab-home block text-xs px-2'>Login</span>
              </a>
              <Link href={ROUTE_REGISTER_ENTERPRISE}>
                <a className='flex flex-row items-center py-4'>
                  <UserAddIcon className='w-5 h-5 ml-2 text-skyBlue' />
                  <span className='tab tab-home block text-xs px-2'>Register</span>
                </a>
              </Link>
            </div>
          )}
          <a className='flex flex-row items-center py-4'>
            <LanguageIcon className='w-5 h-5 ml-2 text-skyBlue' />
            <LangSwitch isMobile className='-top-2 transform -translate-y-full' menuStyle='px-3' />
          </a>
          <a className='flex flex-row items-center py-4'>
            <PriceTagIcon className='w-5 h-5 ml-2 text-skyBlue' />
            <CurrencySwitch isMobile className='-top-2 transform -translate-y-full' menuStyle='px-3' />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default BottomNav;
