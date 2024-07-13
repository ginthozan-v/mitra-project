/* eslint-disable no-unused-vars */
/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 21 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { Listbox, Transition } from '@headlessui/react';
import { DipDownIcon } from '@mtcloud/ui/atoms/icons';
import React, { Fragment } from 'react';

type purchasedCatItems = {
  id: string;
  title: string;
};

const AllProductsSelector = ({
  items,
  selected,
  updateSelect,
}: {
  selected: purchasedCatItems;
  items: purchasedCatItems[];
  updateSelect: (state: purchasedCatItems) => void;
}) => {
  return (
    <div className='relative inline-block text-left z-20 md:mx-0 mx-1.5'>
      <Listbox value={selected} onChange={updateSelect}>
        <div className='relative mt-1'>
          <Listbox.Button className='inline-flex justify-between bg-[#F2F8FB] border border-blue-200 px-4 py-3 rounded-md w-[360px] md:w-[400px] h-[48px] cursor-default items-center text-left'>
            <span className='block truncate pr-2'>{selected?.title}</span>
            <span className='pointer-events-none items-center'>
              <DipDownIcon className='w-6 h-6 ml-2 -mr-1' aria-hidden='true' />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              {items.map((item, itemId) => (
                <Listbox.Option
                  key={itemId}
                  className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'text-skyBlue' : 'text-mtblue'}`}
                  value={item}
                >
                  {({ selected }) => <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{item?.title}</span>}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default AllProductsSelector;
