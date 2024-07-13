/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 10 June 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@mtcloud/ui/atoms/icons';
import { Fragment, useEffect, useState } from 'react';
import api from 'api';
import Modal from 'components/atoms/Modal';

const Notification = ({ isMobile }: { isMobile: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [resultsCount, setResultsCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const noti = await api.notification.get(offset, limit);
      console.log('noti', noti);
      setOffset(noti.offset);
      setLimit(noti.limit);
      setResultsCount(resultsCount + noti.resultCount);
      setTotalCount(noti.totalCount);

      let prevNotification = [...notifications];
      if (noti?.resultCount > 0) {
        noti.results.map((n: any) => {
          if (prevNotification.length) {
            let ifExist = prevNotification.find((x) => x.id === n.id);
            if (ifExist) {
              ifExist.status = n.status;
            } else {
              prevNotification.push(n);
            }
          } else {
            prevNotification.push(n);
          }
        });
      } else {
        prevNotification = notifications;
      }

      setNotifications(prevNotification);
    } catch (error) {
      setNotifications([]);
      console.log('error', error);
    }
  };

  const updateStatus = async (id) => {
    try {
      const body = {
        status: 'READ',
      };
      await api.notification.patch(id, body);
      fetchNotifications();
    } catch (error) {
      console.log('error', error);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight - Math.round(event.target.scrollTop) === event.target.clientHeight;
    if (bottom && resultsCount > 0 && resultsCount < totalCount) {
      setOffset(offset + 1);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    fetchNotifications();
  }, [offset]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications();
    }, 18000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} closeModal={closeModal} heading={modalContent?.heading} content={modalContent?.content}>
          <div className='flex justify-center pt-3'>
            <button className='mt-confirmationBtnYes' onClick={closeModal}>
              Ok
            </button>
          </div>
        </Modal>
      )}
      <Menu as='div' className='relative z-30 inline-block text-left'>
        <div>
          <Menu.Button className='relative inline-flex justify-center py-2 rounded-md hover:text-skyBlue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-mtBlueAlt focus-visible:ring-opacity-75'>
            <BellIcon className='w-8 h-8 text-cms-base-700' />
            {notifications?.some((x) => x.status === 'UNREAD') && (
              <span className='absolute flex items-center justify-center w-5 h-5 text-[10px] font-semibold text-white bg-blue-500 border-2 border-white rounded-full -right-1  bottom-2'>
                {notifications?.filter((x) => x.status === 'UNREAD').length || 0}
              </span>
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
          <Menu.Items
            onScroll={(e) => handleScroll(e)}
            className='absolute right-0 mt-2 overflow-y-auto origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-96 max-h-[90vh] ring-1 ring-black ring-opacity-5 focus:outline-none'
          >
            <h1 className='px-2 py-2 text-lg font-bold'>Notifications</h1>
            <div className='px-1 py-2 '>
              {notifications.length ? (
                notifications.map(({ title, message, status, id }) => {
                  return (
                    <Menu.Item key={id}>
                      {({ active }) => (
                        <button
                          className={`${active && status === 'UNREAD' ? 'bg-skyBlue text-white' : 'text-gray-900 '} ${
                            status === 'UNREAD' && 'bg-gray-50'
                          } group flex rounded-md items-center w-full px-2 py-2 my-1`}
                          onClick={() => {
                            status === 'UNREAD' && updateStatus(id);
                          }}
                        >
                          <div className='w-full text-left '>
                            <h1 className='flex items-center justify-between gap-2 text-base font-semibold'>
                              {title} {status === 'UNREAD' && <div className='w-3 h-3 bg-blue-500 rounded-full' />}
                            </h1>
                            <p className='mt-1 overflow-hidden text-sm max-h-14 text-ellipsis'>{message}</p>
                          </div>
                        </button>
                      )}
                    </Menu.Item>
                  );
                })
              ) : (
                <p className='py-2 text-center'>You have no notifications</p>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default Notification;
