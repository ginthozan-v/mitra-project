/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * File: _app.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: Monday, 7 March 2022 08:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import '../styles/globals.css';
import '../styles/slick.css';
import '../styles/slick-theme.css';
import type { AppProps } from 'next/app';
import { FC, useEffect, useState } from 'react';
import { TranslationProvider } from 'components/hooks/useTranslation';
import { CurrencyProvider } from 'components/hooks/useCurrency';
import { Toaster } from 'react-hot-toast';
import { isLoggedIn, setAuth } from 'utils/auth';
import { NotificationProvider } from 'components/hooks/useNotification';
import AppContainer from 'components/containers/AppContainer';
import { CountryProvider } from 'components/hooks/useCountry';
import { useRouter } from 'next/router';
import useStore from 'store';
import Loader from '@mtcloud/ui/atoms/Loader';
import api from 'api';
import TopStack from 'components/molecules/headers/TopStack';
import getStaticData from 'utils/staticData';

const Noop: FC = ({ children }) => <>{children}</>;
const Connectivity = ({ online, message = 'No internet.' }: any) => (
  <div
    style={online ? null : { boxShadow: '0 1px 10px 3px rgb(0 0 0 / 20%)' }}
    className={`duration-300 fixed z-[5000] top-0 ${
      online ? '-translate-y-[105%] opacity-0' : ''
    } left-1/2 -translate-x-1/2 px-3 py-2 rounded-b-md bg-red-500 text-white text-sm`}
  >
    {message}
  </div>
);

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;
  const showTopStack = (Component as any).TopStack === false ? false : true;
  const [authenticated] = useState(isLoggedIn());
  const router = useRouter();
  const { loading, setLoading, online, setOnline, setSearch, setUserStatus, setLogo, setPrimaryMenu } = useStore((state) => ({
    loading: state.loading,
    setLoading: state.setLoading,
    online: state.online,
    setOnline: state.setOnline,
    setSearch: state.setSearch,
    setUserStatus: state.setUserStatus,
    setLogo: state.setLogo,
    setPrimaryMenu: state.setPrimaryMenu,
  }));
  const [message, setMessage] = useState('No internet.');

  const routeChangeStart = (path: string, { shallow }: { shallow: boolean }) => {
    if (!shallow) {
      setLoading(true);
    }
  };

  const routeChangeComplete = async (path: string) => {
    if (isLoggedIn()) {
      const res = await api.register.getUser();
      setUserStatus(res.status);
    }

    setLoading(false);

    if (!path.startsWith('/searchResults')) {
      setSearch(false);
      // if (typeof window !== 'undefined') {
      //   localStorage.removeItem('productId');
      // }
    }
    if (!path.startsWith('/customer/profile')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('update-user');
      }
    }
  };

  const getAppToken = async () => {
    try {
      let res = await fetch('/api/get-client-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      res = await res.json();

      const { access_token, expires_in } = res as any;
      // console.log('_APP SET_AUTH');
      setAuth(
        {
          access_token,
          expires_in,
          grant_type: 'client_credentials',
        },
        true,
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async () => {
    const { logo, primaryMenu } = await getStaticData(api);
    setLogo(logo);
    setPrimaryMenu(primaryMenu);
  };

  useEffect(() => {
    getData();

    if (typeof window !== 'undefined') {
      window['setNetwork'] = (online, message = 'No internet.') => {
        setOnline(online);
        setMessage(message);
      };
      window.addEventListener('online', () => {
        setOnline(true);
      });
      window.addEventListener('offline', () => {
        setOnline(false);
      });

      getAppToken();
      // window.addEventListener('load', () => {
      //   setTimeout(() => {
      //     if (!isLoggedIn()) {
      //       getAppToken();
      //     }
      //   }, 100);
      // });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        setLoading(false);
        if (window.location.href == localStorage.getItem('redirect')) {
          localStorage.removeItem('redirect');
        }
      });
    }

    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeComplete);

    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeComplete', routeChangeComplete);
    };
  }, [authenticated, routeChangeComplete, router.events]);

  return (
    <TranslationProvider>
      <CurrencyProvider>
        <AppContainer>
          <NotificationProvider>
            <CountryProvider>
              {showTopStack && <TopStack />}
              <Layout pageProps={pageProps}>
                <Component {...pageProps} />
                <Toaster />
                <Connectivity online={online} message={message} />
                {loading && <Loader overlay />}
              </Layout>
            </CountryProvider>
          </NotificationProvider>
        </AppContainer>
      </CurrencyProvider>
    </TranslationProvider>
  );
}

export default MyApp;
