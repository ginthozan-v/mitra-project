/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 02 June 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useState, useEffect } from 'react';
import { authNavigate, isLoggedIn, logout } from 'utils/auth';
import Loader from '@mtcloud/ui/atoms/Loader';
import { useIdleTimer } from 'react-idle-timer';
import api from 'api';

const Auth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [timeout, setTimeout] = useState(120000);

  const fetchAutologout = async () => {
    try {
      let logout = await api.generic_content.get('AUTO_LOGOUT');
      logout = logout.content;
      const data = JSON.parse(logout.data);
      setTimeout(data.period * 1000 * 60);
    } catch (error) {
      console.error(`🚀 ${error.name}`, error.message);
    }
  };

  const onIdle = () => {
    logout();
  };

  useIdleTimer({
    onIdle,
    crossTab: true,
    timeout: timeout,
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

  useEffect(() => {
    fetchAutologout();
    if (!isLoggedIn()) {
      authNavigate();
    }
    setIsAuthenticated(isLoggedIn());
  }, []);

  if (isAuthenticated) {
    return children;
  }
  return (
    <div className='grid h-screen p-10 place-items-center'>
      <Loader>
        <p>Seems like you are not logged in!</p>
        <p>We are redirecting you to the login page...</p>
      </Loader>
    </div>
  );
};

export default Auth;
