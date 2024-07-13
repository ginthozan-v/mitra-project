/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 16 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { currencyList } from 'constants/global';
import useCurrency from 'components/hooks/useCurrency';
import { Menu, Transition } from '@headlessui/react';
import { ChevronRightIcon, ChevronDownIcon } from '@mtcloud/ui/atoms/icons';
import { Fragment, useEffect, useState } from 'react';
import useStore from '@/store';

const CurrencySwitch = ({
  isMobile,
  className,
  menuStyle,
  dropdown = false,
}: {
  isMobile: boolean;
  className?: string;
  menuStyle?: string;
  dropdown?: boolean;
}) => {
  const { id: selectedCurrency, title, setCurrency, updateCurrency } = useCurrency();
  const switchable = useStore((store) => store.currencySwitchable);

  useEffect(() => {
    setCurrency(selectedCurrency || 'mur');
  }, [selectedCurrency]);

  const change = (selectedCurrency) => {
    updateCurrency(selectedCurrency);
  };

  return (
    <div className={`flex items-center ${dropdown ? 'w-full' : ''}`}>
      <Menu as='div' className='relative block w-full text-left z-20'>
        <div className='p-2'>
          <Menu.Button
            className={`flex justify-between w-full ${menuStyle} ${
              isMobile ? 'text-xs' : 'text-sm font-semibold text-mtBlue'
            } hover:text-mtBlue rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-mtBlueAlt focus-visible:ring-opacity-75`}
          >
            {(title || '').toLocaleUpperCase()}
            {false && switchable && (
              <>
                {dropdown ? (
                  <ChevronDownIcon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} aria-hidden='true' />
                ) : (
                  <ChevronRightIcon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} aria-hidden='true' />
                )}
              </>
            )}
          </Menu.Button>
        </div>
        {false && switchable && (
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items
              style={{ width: 'fit-content', minWidth: '100%' }}
              className={`${className} absolute right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              <div className='px-1 py-1 '>
                {Object.values(currencyList)
                  .filter((i) => i.id !== selectedCurrency)
                  .map(({ id, title, detail }) => {
                    return (
                      <Menu.Item key={id}>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-skyBlue text-white' : 'text-gray-900'
                            } group whitespace-nowrap flex rounded-md items-center w-full px-2 py-2 text-sm text-left font-semibold`}
                            onClick={() => {
                              change(id);
                            }}
                          >
                            {detail}
                          </button>
                        )}
                      </Menu.Item>
                    );
                  })}
              </div>
            </Menu.Items>
          </Transition>
        )}
      </Menu>
    </div>
  );
};

export default CurrencySwitch;
