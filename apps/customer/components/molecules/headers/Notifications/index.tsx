/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 23 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import BellIcon from '@mtcloud/ui/atoms/icons/BellIcon';
import { ROUTE_NOTIFICATIONS } from 'constants/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Notifications = ({ isMobile = false, count }: { isMobile: boolean; count: number }) => {
  const { pathname } = useRouter();

  return (
    <Link href={ROUTE_NOTIFICATIONS}>
      <a className='h-9 w-9 pl-3 grid grid-cols-2 place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-mtBlueAlt focus-visible:ring-opacity-75 rounded-md'>
        <BellIcon
          className={`${isMobile ? 'w-8 h-8' : 'w-5 h-5'} ${
            pathname.includes(ROUTE_NOTIFICATIONS) ? 'text-skyBlue' : 'text-mtBlue'
          }`}
        />
        {count !== 0 ? (
          <span className='w-4 h-4 mb-4 rounded-full bg-red-600 text-white text-center text-xs z-10'>
            {count}
          </span>
        ) : null}
      </a>
    </Link>
  );
};

export default Notifications;
