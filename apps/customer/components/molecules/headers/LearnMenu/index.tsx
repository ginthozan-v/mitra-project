/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Tuesday, 10 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { ROUTE_FAQ } from 'constants/routes';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@mtcloud/ui/atoms/icons';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

const learnMenuItems = [
  { title: 'FAQ', path: ROUTE_FAQ },
  { title: 'Documentation', path: 'https://docs.myt.mu/mohelpcenter/operation/en-us/index.html' },
];

const LearnMenu = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <Menu as='div' className='relative inline-block text-left z-10'>
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              className={`py-2 flex items-center font-semibold relative ${
                router.pathname.split('/')[1] === 'faq' ? 'text-skyBlue' : ''
              } hover:text-[#00AEEF] after:relative after:top-[-1px]`}
            >
              <span>{title}</span>
              {open ? (
                <ChevronDownIcon className='w-5 h-5 ml-1 -mr-1' aria-hidden='true' />
              ) : (
                <ChevronRightIcon className='w-5 h-5 ml-1 -mr-1' aria-hidden='true' />
              )}
            </Menu.Button>
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
                {learnMenuItems.map(({ title, path }) => {
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
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default LearnMenu;
