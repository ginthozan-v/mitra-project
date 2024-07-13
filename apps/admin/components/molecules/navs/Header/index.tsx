/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 24 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useState, useEffect } from 'react';
import { IMG_LOGO } from 'constants/images';
import { isLoggedIn } from 'utils/auth';
import UserMenu from './UserMenu';
import Notification from './Notification';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  return (
    <nav className='bg-white shrink-0'>
      <div className='flex items-center justify-between h-16 px-4 text-gray-800 border-b border-b-cms-base-40'>
        <div>
          <img src={IMG_LOGO.src} alt={IMG_LOGO.alt} className='w-10' />
        </div>
        <div className='flex items-center space-x-2'>
          <Notification isMobile={false} />
          {isAuthenticated && <UserMenu isMobile={false} />}
        </div>
      </div>
    </nav>
  );
};

export default Header;
