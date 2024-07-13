/*
 * File: _app.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: Monday, 7 March 2022 08:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { FC, useEffect, useState } from 'react';
import { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

import Auth from 'components/auth';
import { PermissionProvider } from 'hooks/usePermission';
import { NavigationProvider } from 'hooks/useNavigation';
import useStore from 'store';

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

// eslint-disable-next-line react/jsx-no-useless-fragment
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

function MyApp({ Component, pageProps }: CustomAppProps) {
  const Layout = (Component as any).Layout || Noop;
  const routeSettings = (Component as any).routeSettings || {};
  const { online, setOnline } = useStore((state) => ({
    online: state.online,
    setOnline: state.setOnline,
  }));
  const [message, setMessage] = useState('No internet.');

  useEffect(() => {
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
    }
  }, []);

  return (
    <>
      {Component.auth === false ? (
        <Layout pageProps={pageProps} routeSettings={routeSettings}>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Auth>
          <PermissionProvider>
            <NavigationProvider>
              <Layout pageProps={pageProps} routeSettings={routeSettings}>
                <Component {...pageProps} />
                <Connectivity online={online} message={message} />
              </Layout>
            </NavigationProvider>
          </PermissionProvider>
        </Auth>
      )}
    </>
  );
}

export default MyApp;
