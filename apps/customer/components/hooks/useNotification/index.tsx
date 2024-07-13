/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Thurseday, 28 July 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { PropsReactChildren } from '@mtcloud/globals/types';
import { isLoggedIn } from 'utils/auth';
import api from 'api';

type initialNotificationData = {
  count: number;
  toast: { id: number; title: string; message: string; link: string }[];
};

const NotificationContext = createContext<initialNotificationData[]>([]);

export function NotificationProvider({ children }: PropsReactChildren) {
  const { locale } = useRouter();
  const [notification, setNotification] = useState<initialNotificationData[]>([]);

  useEffect(() => {
    if (isLoggedIn()) {
      const getData = async () => {
        try {
          const res = await api.notifications.getAlertNotifications(
            'UNREAD',
            0,
            1000,
            locale,
            'ALERT,TOAST',
          );
          const ack = await api.notifications.getAlertNotifications(
            'UNREAD',
            0,
            1000,
            locale,
            'TOAST',
            false,
          );
          const toast = [];
          const data = [];
          if (ack.results !== 0) {
            ack.results.map(({ id, title, message, link }) =>
              toast.push({ id, title, message, link }),
            );
          }

          data.push({ count: res.totalCount, toast });

          setNotification(data);
        } catch (error) {
          console.log('errr', error.message);
          setNotification([{ count: 0, toast: [] }]);
        }
      };
      getData();
    }
  }, [locale]);

  return (
    <NotificationContext.Provider value={notification}>{children}</NotificationContext.Provider>
  );
}

export default function useNotifications() {
  const notifications = useContext(NotificationContext);
  return notifications;
}
