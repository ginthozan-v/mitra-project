/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 23 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import {
  ROUTE_BILLING,
  ROUTE_BILLING_HISTORY,
  ROUTE_LOYALTY,
  ROUTE_PAYMENT_HISTORY,
  ROUTE_PROFILE,
  ROUTE_PURCHASED_PRODUCTS,
  ROUTE_SAVED,
  ROUTE_SETTINGS,
  ROUTE_SETTINGS_PAYMENT,
  ROUTE_SETTINGS_POSTPAID,
  ROUTE_SETTINGS_SECURITY,
} from 'constants/routes';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  LogoutIcon,
  UserAddIcon,
} from '@mtcloud/ui/atoms/icons';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'components/atoms/Modal';
import { logout, getAuth } from 'utils/auth';
import { GENERIC_CONTENT } from 'api/generic-contents';
import api from 'api';
import useStore from 'store';

const userMenuItems = [
  { title: 'Profile', path: ROUTE_PROFILE },
  { title: 'Loyalty', path: ROUTE_LOYALTY },
  { title: 'Billing Center', path: ROUTE_BILLING },
  { title: 'Saved Items', path: ROUTE_SAVED },
  { title: 'Settings', path: ROUTE_SETTINGS },
];

const UserMenu = ({ isMobile }: { isMobile: boolean }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMount, setMount] = useState(false);
  const { pathname } = useRouter();
  const { loyalty, setLoyalty } = useStore((state) => ({
    loyalty: state.loyalty,
    setLoyalty: state.setLoyalty,
  }));

  useEffect(() => {
    api.genericContents.get(GENERIC_CONTENT.LOYALTY_IS_ACTIVE).then((res) => {
      setLoyalty(res?.active);
      if (router.pathname.startsWith(ROUTE_LOYALTY) && !res?.active) {
        router.push('/');
      }
    });

    setMount(true);
    setUserName(getAuth().firstName + ' ' + getAuth().lastName);
  }, [router, setLoyalty]);

  const onLogout = () => {
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }

  const pathCheck = () => {
    if (
      pathname.includes(ROUTE_PROFILE) ||
      pathname.includes(ROUTE_LOYALTY) ||
      pathname.includes(ROUTE_BILLING) ||
      pathname.includes(ROUTE_BILLING_HISTORY) ||
      pathname.includes(ROUTE_PURCHASED_PRODUCTS) ||
      pathname.includes(ROUTE_PAYMENT_HISTORY) ||
      pathname.includes(ROUTE_SAVED) ||
      pathname.includes(ROUTE_SETTINGS) ||
      pathname.includes(ROUTE_SETTINGS_SECURITY) ||
      pathname.includes(ROUTE_SETTINGS_POSTPAID) ||
      pathname.includes(ROUTE_SETTINGS_PAYMENT)
    ) {
      return true;
    } else return false;
  };

  return (
    isMount && (
      <Menu as='div' className='relative inline-block text-left z-30'>
        {({ open }) => (
          <>
            <div>
              {isMobile ? (
                <Menu.Button className='inline-flex justify-center py-2 hover:text-skyBlue rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-mtBlueAlt focus-visible:ring-opacity-75'>
                  <UserAddIcon
                    className={`w-7 h-7 focus:text-skyBlue ${
                      pathCheck() ? 'text-skyBlue' : 'text-mtBlue'
                    }`}
                  />
                </Menu.Button>
              ) : (
                <Menu.Button
                  className={`inline-flex justify-center w-full px-4 py-2 text-sm font-medium ${
                    pathCheck() ? 'text-skyBlue' : 'text-mtBlue'
                  } hover:text-mtBlue rounded-md  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-mtBlueAlt focus-visible:ring-opacity-75`}
                >
                  <span className='font-semibold'>Hello {userName}</span>
                  {open ? (
                    <ChevronDownIcon className='w-5 h-5 ml-1 -mr-1' aria-hidden='true' />
                  ) : (
                    <ChevronRightIcon className='w-5 h-5 ml-1 -mr-1' aria-hidden='true' />
                  )}
                </Menu.Button>
              )}
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 w-36 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='px-1 py-1 '>
                  {userMenuItems.map(({ title, path }) => (
                    <Fragment key={path}>
                      {(loyalty || title !== 'Loyalty') && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-skyBlue text-white' : 'text-gray-900'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold`}
                              onClick={() => router.push(path)}
                            >
                              {title}
                            </button>
                          )}
                        </Menu.Item>
                      )}
                    </Fragment>
                  ))}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-mtBlue/80 ' : 'bg-mtBlue'
                        } flex items-center justify-center  rounded-md w-full mt-2 font-semibold px-2 py-2 text-sm text-white`}
                        onClick={() => {
                          onLogout();
                        }}
                      >
                        <span>Log Out</span>
                        <LogoutIcon className='w-4 h-4 ml-1.5' />
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
            {isOpen && (
              <Modal isOpen={isOpen} closeModal={closeModal} heading='Log Out'>
                <div className='p-6'>
                  <div className='m-6'>
                    <p className='text-lg text-center'>Do you want to log out?</p>
                  </div>

                  <div className='flex justify-between pt-3 gap-3'>
                    <button
                      className='rounded border border-mtgreen w-44 h-8 bg-white'
                      onClick={closeModal}
                    >
                      No
                    </button>
                    <button className='rounded bg-skyBlue w-44 h-8 text-center' onClick={logout}>
                      Yes
                    </button>
                  </div>
                </div>
              </Modal>
            )}
          </>
        )}
      </Menu>
    )
  );
};

export default UserMenu;
