/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 5 May 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

import { SubMenuMobileIcon } from '@mtcloud/ui/atoms/icons';
import Link from 'next/link';

type ListItem = {
  title: string;
  id: string;
  path: string;
};

const MobileSelect = ({ list, select }: { select: ListItem; list: ListItem[] }) => {
  const [selectedCategory, setSelected] = useState(select);

  return (
    <div className='p-4 sm:px-6 block md:hidden'>
      <Listbox value={selectedCategory} onChange={setSelected}>
        <div className='relative mt-1'>
          <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-4 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm text-skyBlue font-semibold'>
            <span className='block truncate'>{select?.title}</span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <SubMenuMobileIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='z-30 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {list.map((item) => (
                <Listbox.Option
                  key={item.title}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active ? ' text-skyBlue' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <Link href={item.path}>
                      <a className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {item.title}
                      </a>
                    </Link>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default MobileSelect;
