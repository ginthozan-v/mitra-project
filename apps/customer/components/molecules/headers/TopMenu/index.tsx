/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 30 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { CartIcon, CircleCloseIcon } from '@mtcloud/ui/atoms/icons';
import CurrencySwitch from 'components/molecules/CurrencySwitch';
import LangSwitch from 'components/molecules/LangSwitch';
import {
  ROUTE_CART,
  ROUTE_NOTIFICATIONS,
  ROUTE_REGISTER_ENTERPRISE,
  ROUTE_SUPPORT,
} from 'constants/routes';
import Link from 'next/link';
import Notifications from 'components/molecules/headers/Notifications';
import Search from 'components/molecules/headers/Search';
import UserMenu from 'components/molecules/headers/UserMenu';
import { useRouter } from 'next/router';
import { isLoggedIn } from 'utils/auth';
import { useState, useEffect } from 'react';
import useNotifications from 'components/hooks/useNotification';
import toast from 'react-hot-toast';
import api from 'api';
import pageLink from 'constants/notification/links.json';
import { eraseCookie, getCookie, setCookie } from 'utils/cookie';

const CartLink = ({ url }) => {
  return (
    <Link href={url}>
      <a className='h-9 w-9 pl-2 grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-mtBlueAlt focus-visible:ring-opacity-75 rounded-md'>
        <CartIcon className='w-5 h-5 text-mtBlue' />
      </a>
    </Link>
  );
};

const TopMenu = () => {
  const { pathname } = useRouter();
  const notification = useNotifications();
  const [isAuthenticated] = useState(isLoggedIn());
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [read, setRead] = useState(false);

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
    let cart;
    if (isAuthenticated) {
      (async () => {
        cart = await api.cart.getUserCart();
        if (cart && cart.visitId) {
          // user has a cart
          localStorage.setItem('cart', cart.visitId);
          // check if there is a local cart as well and prompt user on next action...
          // eraseCookie('cart');
        } else {
          api.cart.createCart().then(res => {
            if (res?.visitId) {
              localStorage.setItem('cart', res.visitId);
            }
          });
        }
      })();
    }

    if (!cart) {
      const visitId = getCookie('cart');
      if (visitId) {
        // check if the cart exists
        api.cart.getCart(visitId).then((res) => {
          cart = res;
          setCookie({
            name: 'cart',
            value: cart.visitId,
            expiry: 365,
          });

          if (isAuthenticated) {
            // assign cart to current user
            api.cart.updateCartOwner(visitId).then((res) => {
              if (res?.status !== 200) {
                // toast.error(res.data.message);
              } else {
                localStorage.setItem('cart', cart.visitId);
                eraseCookie('cart');
              }
            });
          }
        });
      }
    }
  }, [isAuthenticated]);

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
              <div
                className='flex-1 w-0 px-4 py-2 cursor-pointer'
                onClick={() => updateState(i.id, t.id)}
              >
                <div className='flex items-start'>
                  <div className='ml-3 flex-1'>
                    <p className='mt-1 text-xs text-mtBlue text-justify shrink-0 line-clamp-2'>
                      {i.message}
                    </p>
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
              <div className='flex border-l border-gray-200 ml-2'>
                <button
                  onClick={() => dismissToast(i.id, t.id)}
                  className='w-full flex items-center justify-center'
                >
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
    <div className='border-b border-b-gray-300/50 bg-white hidden sm:block'>
      <div className='flex items-center justify-end h-12 space-x-2 max-w-7xl w-full mx-auto px-2'>
        <Search />

        <LangSwitch isMobile={false} />

        <CurrencySwitch isMobile={false} />

        <div>
          {isAuthenticated ? (
            <div className='flex items-center justify-end h-12 space-x-2'>
              <Link href={ROUTE_SUPPORT}>
                <a
                  className={`text-sm font-semibold pl-2 ${
                    pathname.includes(ROUTE_SUPPORT) ? 'text-skyBlue' : 'text-mtBlue'
                  }`}
                >
                  Support
                </a>
              </Link>
              <Notifications isMobile={false} count={notification[0]?.count} />
              <Link href={ROUTE_CART}>
                <a className={`h-9 w-9 pl-2 grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-mtBlueAlt focus-visible:ring-opacity-75 rounded-md`}>
                  <CartIcon className={`w-5 h-5 ${
                    pathname.includes(ROUTE_CART) ? 'text-skyBlue' : 'text-mtBlue'
                  }`} />
                </a>
              </Link>
              <UserMenu isMobile={false} />
            </div>
          ) : (
            <div className='inline-flex px-4'>
              <Link href='/login'>
                <a className='border-r border-r-mtBlue pr-4 text-mtBlue font-semibold text-sm '>
                  Login
                </a>
              </Link>
              <Link href={ROUTE_REGISTER_ENTERPRISE}>
                <a className='ml-4 block text-mtBlue font-semibold text-sm '>Register</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
