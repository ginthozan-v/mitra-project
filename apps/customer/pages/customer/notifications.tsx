/* eslint-disable no-unused-vars */
/*
 * File: notifications.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 23 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { BinIcon, EnvelopeOpenIcon } from '@mtcloud/ui/atoms/icons';
import api from 'api';
import Modal from 'components/atoms/Modal';
import AuthGuard from 'components/utils/AuthGuard';
import MainLayout from 'components/layouts/MainLayout';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import NotificationListItem from 'components/molecules/NotificationListItem';
import SEO from 'components/utils/SEO';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Pagination from 'components/molecules/Pagination';
import useStore from 'store';
import { NETWORK_STATUS_CODES } from '@/constants';

const Notifications = () => {
  const [total, setTotal] = useState();
  const [resultCount, setResultCount] = useState(10);
  const [isDisable, setDisable] = useState(false);
  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useRouter();
  const [notificationData, setNotificationData] = useState([]);

  const { loading, setLoading } = useStore((state) => ({
    loading: state.loading,
    setLoading: state.setLoading,
  }));

  useEffect(() => {
    setLoading(true);
    const getData = async (limit: number) => {
      try {
        const res = await api.notifications.getAlertNotifications('READ,UNREAD', page, limit, locale, 'ALERT,TOAST');

        if (res.length !== 0) {
          const data = res.results.map(({ id, title, type, message, link, status, createdAt }) => ({
            id,
            heading: title,
            description: message,
            dateTime: createdAt,
            isRead: status === 'UNREAD' ? false : true,
            notificationType: type,
            link,
          }));
          const val = data.map((obj) => ({
            ...obj,
            dateTime: new Date(obj.dateTime),
          }));
          val.sort((objA, objB) => objB.dateTime.getTime() - objA.dateTime.getTime());
          setNotificationData(val);
        } else {
          setNotificationData([]);
        }
        setLoading(false);
        setTotal(res.totalCount);
      } catch {
        setLoading(false);
        toast.error('Something went wrong', { duration: 8000 });
      }
    };
    getData(resultCount);
  }, [locale, page, resultCount]);

  const updateLimit = (newState: number) => {
    setResultCount(newState);
    setPage(0);
    setDisable(false);
  };

  const nextPage = (val: number, total: number) => {
    const x = total / (val + 1);

    if (notificationData.length !== resultCount || x === resultCount) {
      setDisable(true);
      setPage(val);
    } else {
      setDisable(false);
      setPage(val + 1);
    }
  };

  const prevPage = (val: number) => {
    if (page !== 0) {
      setDisable(false);
      setPage(val - 1);
    } else {
      setPage(val);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  async function deleteMgs() {
    {
      const res = await api.notifications.deleteAll();
      if (res === 'SUCCESS') {
        location.reload();
      } else {
        if (!NETWORK_STATUS_CODES.includes(res)) {
          toast.error('Something went wrong', { duration: 8000 });
        }
      }
    }
    setIsOpen(false);
  }

  const onDelete = () => {
    setIsOpen(true);
  };

  const updateAllRead = async () => {
    {
      const res = await api.notifications.updateStatusAll('READ');
      if (res === 'SUCCESS') {
        location.reload();
      } else {
        if (!NETWORK_STATUS_CODES.includes(res)) {
          toast.error('Something went wrong', { duration: 8000 });
        }
      }
    }
  };

  return (
    <>
      <SEO title='Notifications' desc='Notifications Description' />
      <ItemDescription title='Notifications' type='TitleBannerSlim' image='/bgsample-mt.jpg' />
      <div className='p-4 mx-auto max-w-7xl'>
        <div className='flex flex-row justify-end'>
          <button className='inline-flex items-center mx-4 text-sm font-normal' onClick={() => updateAllRead()}>
            <EnvelopeOpenIcon className='w-5 h-5 mr-2' />
            Mark all as read
          </button>
          <button className='inline-flex items-center ml-4 text-sm font-normal' onClick={onDelete}>
            <BinIcon className='w-4 h-4 mr-2' /> Delete all
          </button>
          {isOpen && (
            <Modal isOpen={isOpen} closeModal={closeModal} heading='Delete All Notifications'>
              <div className='p-6'>
                <div className='m-6'>
                  <p className='text-lg text-center'>Are you sure you want to delete all notifications ?</p>
                </div>

                <div className='flex justify-between pt-3'>
                  <button className='w-40 h-8 bg-white border rounded border-mtgreen md:w-44' onClick={closeModal}>
                    No
                  </button>
                  <button className='w-40 h-8 text-center rounded bg-skyBlue md:w-44' onClick={deleteMgs}>
                    Yes
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
        <div>
          {!loading && (
            <div>
              {notificationData.length === 0 ? (
                <div className='py-20 text-3xl font-medium text-center'>You have no notifications yet</div>
              ) : (
                <div>
                  {notificationData.map(({ id, heading, description, dateTime, link, isRead, notificationType }) => (
                    <NotificationListItem
                      key={id}
                      id={id}
                      heading={heading}
                      description={description}
                      dateTime={dateTime}
                      notificationType={notificationType}
                      isRead={isRead}
                      link={link}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <Pagination
          updatePageLimit={updateLimit}
          limit={resultCount}
          count={total}
          page={page}
          isDisable={isDisable}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </>
  );
};

Notifications.Layout = MainLayout;

export default AuthGuard(Notifications);
