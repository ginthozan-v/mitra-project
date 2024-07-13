/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 10 June 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import type { PropsReactChildren } from '@mtcloud/globals/types'
import { CircleCloseIcon } from '@mtcloud/ui/atoms/icons'

const Modal = ({
    isOpen,
    closeModal,
    heading,
    content,
    children,
    className = 'max-w-lg bg-white',
}: {
    isOpen: boolean
    heading: string
    content: string
    className?: string
    closeModal: () => void
} & PropsReactChildren) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
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
                            className={`inline-block w-full overflow-hidden text-left align-middle transition-all transform  shadow-xl rounded-md ${className}`}
                        >
                            <div className='bg-mtgreen text-white flex justify-end px-3 py-1'>
                                <button onClick={closeModal} className='outline-none'>
                                    <CircleCloseIcon className='w-6 h-6 text-[#FFA400]' />
                                </button>
                            </div>
                            <div className='p-6'>
                                {heading && (
                                    <h3 className='text-2xl text-center font-medium leading-6 text-gray-900'>
                                        {heading}
                                    </h3>
                                )}
                                {content && (
                                    <div className='m-6'>
                                        <p className='text-lg text-center'>{content}</p>
                                    </div>
                                )}
                                {children}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Modal
