/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 10 June 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { Menu, Transition } from '@headlessui/react';
import { LogoutIcon, UserAddIcon } from '@mtcloud/ui/atoms/icons';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, logout } from 'utils/auth';
import Modal from 'components/atoms/Modal';

const userMenuItems = [{ title: 'Profile', path: 'ROUTE_PROFILE' }];

const UserMenu = ({ isMobile }: { isMobile: boolean }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const onLogout = () => {
    setIsOpen(true);
  };
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Menu as='div' className='relative inline-block text-left z-30'>
      <div>
        {isMobile ? (
          <Menu.Button className='inline-flex justify-center py-2 hover:text-skyBlue rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-mtBlueAlt focus-visible:ring-opacity-75'>
            <UserAddIcon className='w-7 h-7 text-mtBlue focus:text-skyBlue' />
          </Menu.Button>
        ) : (
          <Menu.Button className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-mtBlue hover:text-mtBlue rounded-md  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-mtBlueAlt focus-visible:ring-opacity-75'>
            <div
              className='shrink-0 w-8 h-8 grid place-items-center uppercase font-bold rounded-full border-2 border-cms-base-100 bg-sky-100 text-cms-base-700'
              suppressHydrationWarning
            >
              {getAuth().given_name?.charAt(0)}
            </div>
            {/* <ChevronDownIcon
                            className="w-5 h-5 ml-2 -mr-1"
                            aria-hidden="true"
                        /> */}
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
            {userMenuItems.map(({ title, path }) => {
              return (
                <Menu.Item key={path}>
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
              );
            })}
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
                  <span>Logout</span>
                  <LogoutIcon className='w-4 h-4 ml-1.5' />
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          heading='Logout'
          content='Do you want to logout ?'
        >
          <div className='flex justify-center pt-3 gap-3'>
            <button className='mt-confirmationBtnNo' onClick={closeModal}>
              No
            </button>
            <button className='mt-confirmationBtnYes' onClick={logout}>
              Yes
            </button>
          </div>
        </Modal>
      )}
    </Menu>
  );
};

export default UserMenu;
