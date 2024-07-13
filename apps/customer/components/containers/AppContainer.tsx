/**
 * File: AppContainer.tsx
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 14 September 2022, 11:35
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import api from 'api';
import useCurrency from 'components/hooks/useCurrency';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { logout, isLoggedIn, getAuth } from 'utils/auth';
import { useIdleTimer } from 'react-idle-timer';
import { GENERIC_CONTENT } from 'api/generic-contents';
import useStore from 'store';

const IdleTimer = ({ timeout }: { timeout }) => {
  const online = useStore((state) => state.online);
  const auth = getAuth();

  const onIdle = () => {
    if (isLoggedIn()) {
      logout();
    }
  };

  const idleTimer = useIdleTimer({
    onIdle,
    crossTab: true,
    timeout: timeout * 1000 * 60,
    events: [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove',
      // 'visibilitychange',
    ],
    startOnMount: true,
    name: 'idle-timer',
  });

  useIdleTimer({
    onAction: async () => {
      const reqOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.access_token}`,
        },
      };

      let response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${process.env.NEXT_PUBLIC_API_VERSION}/user`, reqOptions);
      if (response.status === 401) {
        logout();
      }
    },
    debounce: 1000,
    crossTab: true,
    timeout: 1000,
    events: ['visibilitychange'],
    startOnMount: true,
    name: 'user-focus',
  });

  useEffect(() => {
    if (idleTimer && online) {
      idleTimer.resume();
      console.log('IDLE_TIMER_RESUME', idleTimer.getRemainingTime());
    } else {
      idleTimer.pause();
      console.log('IDLE_TIMER_PAUSE', idleTimer.getRemainingTime());
    }
  }, [online]);

  return <></>;
};

const AppContainer = ({ children }) => {
  const { setCurrency } = useCurrency();
  const { locales, push, asPath } = useRouter();
  const [state, setState] = useState({
    preferredCurrency: 'mur',
    preferredLanguage: 'en',
  });
  const [idleTimeout, setIdleTimeout] = useState(null);

  useEffect(() => {
    if (isLoggedIn()) {
      const getGeneralSettings = async () => {
        const res = await api.user.settings.getGeneralSettings();
        if (res) {
          setState((state) => {
            return { ...state, ...res };
          });
        }
      };
      getGeneralSettings().catch((error) => {
        console.error(error);
      });
    }
    api.genericContents.get(GENERIC_CONTENT.AUTO_LOGOUT).then((res) => {
      setIdleTimeout(res?.period);
    });
  }, []);

  useEffect(() => {
    if (state) {
      if (state.preferredLanguage && locales.includes(state.preferredLanguage)) {
        push(asPath, null, {
          locale: state.preferredLanguage,
        });
      }

      if (state.preferredCurrency) {
        setCurrency(state.preferredCurrency);
      }
    }
  }, [state]);

  return (
    <>
      {isLoggedIn() && idleTimeout && idleTimeout > 0 && <IdleTimer timeout={idleTimeout} />}
      {children}
    </>
  );
};

export default AppContainer;
