/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Friday, 13 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@mtcloud/ui/atoms/icons';

type industryMenuItems = {
  solutionId: string;
  solutionIndustry: any;
  solutionKey: string;
};

const IndustryDropdown = ({
  items,
  selected,
  locale,
  updateSelect,
}: {
  selected: industryMenuItems;
  items: industryMenuItems[];
  locale: string;
  // eslint-disable-next-line no-unused-vars
  updateSelect: any;
}) => {
  return (
    <div className='relative inline-block text-left z-20 backdrop-blur-sm'>
      <Listbox value={selected} onChange={updateSelect}>
        {({ open }) => (
          <div className='relative drop-shadow'>
            <Listbox.Button
              className={`inline-flex justify-between w-56 md:w-96 h-10 md:h-12 cursor-default items-center bg-white ${
                open ? 'rounded-t-md' : 'rounded-md bg-opacity-80'
              } px-4 py-2 text-xl sm:text-2xl font-medium text-mtBlue text-left`}
            >
              <span className='block truncate pr-2'>{selected?.solutionIndustry[locale]}</span>
              <span className='pointer-events-none items-center'>
                {open ? (
                  <ChevronDownIcon className='w-8 md:w-10 ml-2 -mr-1' aria-hidden='true' />
                ) : (
                  <ChevronRightIcon className='w-8 md:w-10 ml-2 -mr-1' aria-hidden='true' />
                )}
              </span>
            </Listbox.Button>
            <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
              <Listbox.Options className='absolute max-h-60 w-full overflow-auto rounded-b-md bg-white pb-1 text-xl sm:text-2xl focus:outline-none'>
                {items.map((item, itemId) => (
                  <div key={itemId}>
                    {item.solutionId != selected.solutionId && (
                      <Listbox.Option
                        key={itemId}
                        className={({ active }) =>
                          `relative cursor-pointer select-none h-10 md:h-12 py-2 px-4 ${active ? 'text-skyBlue' : 'text-mtblue'}`
                        }
                        value={item}
                      >
                        <span className={`block truncate font-normal`}>{item.solutionIndustry[locale]}</span>
                      </Listbox.Option>
                    )}
                  </div>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default IndustryDropdown;
