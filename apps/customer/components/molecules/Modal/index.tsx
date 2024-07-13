/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 30 March 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import type { modalTypes } from './types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CircleCloseIcon } from '@mtcloud/ui/atoms/icons';

export default function Modal({
  showModal,
  setShowModal,
  heading,
  content,
  cssClass = 'max-w-md',
}: modalTypes) {
  function closeModal() {
    setShowModal(false);
  }

  return (
    <div>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as='div' className='fixed inset-0 z-10 overflow-y-auto' onClose={closeModal}>
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 opacity-80 bg-[#EFEFEF]' />
            </Transition.Child>
            <span className='inline-block h-screen align-middle' aria-hidden='true'>
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div
                className={`inline-block w-full ${cssClass} mt-20 mb-20 sm:mt-36 sm:mb-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md`}
              >
                <div className='bg-mtgreen w-full h-8 flex'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-white px-3 py-1'
                  >
                    {heading}
                  </Dialog.Title>
                  <button
                    type='button'
                    onClick={closeModal}
                    className='absolute text-mtgreen text-lg right-0 top-0 p-1.5'
                  >
                    <CircleCloseIcon className='w-5 h-5 text-[#FFA400]' />
                  </button>
                </div>
                <div className='p-6 pt-0'>
                  <div className='text-sm text-gray-500'>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
