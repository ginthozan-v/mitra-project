/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 22 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import type { PropsReactChildren } from '@mtcloud/globals/types';
import { CircleCloseIcon } from '@mtcloud/ui/atoms/icons';

const Modal = ({
  isOpen,
  heading = '',
  className = 'max-w-lg bg-white',
  closeModal,
  children,
}: {
  isOpen: boolean;
  heading?: string;
  className?: string;
  closeModal: () => void;
} & PropsReactChildren) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='fixed inset-y-10 inset-x-0 z-[5000]' onClose={closeModal}>
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
            <div className={`inline-block w-full overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-md ${className}`}>
              <div className='bg-mtgreen text-white text-lg flex px-3 py-1'>
                {heading && <div className='font-semibold'>{heading}</div>}
                <button onClick={closeModal} className='ml-auto'>
                  <CircleCloseIcon className='w-6 h-6 text-[#FFA400]' />
                </button>
              </div>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
