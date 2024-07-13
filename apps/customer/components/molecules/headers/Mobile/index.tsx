/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 31 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { CartIcon, CircleCloseIcon, HamburgerIcon } from '@mtcloud/ui/atoms/icons';
import Notifications from 'components/molecules/headers/Notifications';

import { IMG_LOGO } from 'constants/images';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import BottomNav from './BottomNav';
import UserMenu from '../UserMenu';
import { ROUTE_CART, ROUTE_NOTIFICATIONS } from 'constants/routes';
import Search from '../Search';
import { isLoggedIn } from 'utils/auth';
import useNotifications from 'components/hooks/useNotification';
import toast from 'react-hot-toast';
import api from 'api';
import { useRouter } from 'next/router';
import pageLink from 'constants/notification/links.json';
import Image from 'next/image';

const Mobile = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());
  const notification = useNotifications();
  const [expanded, setExpanded] = useState(false);
  const [read, setRead] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  const dismissToast = async (id: number, toastId) => {
    const status = await api.notifications.updateAcknowledge(id);

    if (status === 'SUCCESS') {
      toast.dismiss(toastId);
      location.reload();
    }
  };

  const routeChangeComplete = async (path: string) => {
    if (path.startsWith(ROUTE_NOTIFICATIONS)) {
      location.reload();
    }
  };

  useEffect(() => {
    const updateState = async (id: number, toastId) => {
      setExpanded(true);
      const status = await api.notifications.updateAcknowledge(id);

      if (status === 'SUCCESS') {
        toast.dismiss(toastId);
        if (!read) {
          const res = await api.notifications.updateStatus(id, 'READ');

          if (res === 'SUCCESS') {
            setRead(!read);
            router.push(ROUTE_NOTIFICATIONS);
            router.events.on('routeChangeComplete', routeChangeComplete);
          }
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem('notiID', id.toString());
          localStorage.setItem('isExpand', (!expanded).toString());
        }
      }
    };

    if (notification[0]?.toast?.length !== 0 || notification[0]?.toast?.length !== undefined) {
      notification[0]?.toast.map((i) => {
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-gray-200 shadow-lg rounded-full pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className='flex-1 w-0 px-4 py-2 cursor-pointer' onClick={() => updateState(i.id, t.id)}>
                <div className='flex items-start'>
                  <div className='ml-3 flex-1'>
                    <p className='mt-1 text-xs text-mtBlue shrink-0 line-clamp-2 text-justify'>{i.message}</p>
                    <p className='text-justify'>
                      {i?.link?.length !== 1 && (
                        <a href={pageLink[i?.link]?.link} className='text-mtBlue text-xs font-bold'>
                          {pageLink[i?.link]?.text}
                        </a>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex border-l border-gray-200'>
                <button onClick={() => dismissToast(i.id, t.id)} className='w-full flex items-center justify-center'>
                  <CircleCloseIcon className='w-8 h-8 text-red-400 hover:text-red-700' />
                </button>
              </div>
            </div>
          ),
          { duration: Infinity, id: i.id.toString() },
        );
      });
    }
  }, [notification, expanded, read, router]);

  return (
    <div className=' sm:hidden bg-white flex items-center h-16 text-mtBlue px-2 space-x-4'>
      <Link href='/'>
        <a>
          <Image src={IMG_LOGO.src} alt={IMG_LOGO.alt} height={'40px'} width={'40px'} />
        </a>
      </Link>
      <div className='grow' />
      <Search />
      {isAuthenticated && (
        <>
          <UserMenu isMobile />
          <Notifications isMobile count={notification[0]?.count} />{' '}
          <Link href={ROUTE_CART}>
            <a className=''>
              <CartIcon className='w-8 h-8 text-mtBlue' />
            </a>
          </Link>
        </>
      )}
      <div className='static' onClick={() => setIsNavOpen(true)}>
        {!isNavOpen ? <HamburgerIcon className='w-8 h-8' /> : <div className='hidden' />}
      </div>
      {isNavOpen ? (
        <div className='block pl-4'>
          <HamburgerMenu setIsNavOpen={setIsNavOpen} />
        </div>
      ) : (
        <div className='hidden' />
      )}

      <BottomNav />
    </div>
  );
};

export default Mobile;
