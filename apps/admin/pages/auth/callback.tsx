/*
 * File: callback.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 10 May 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import { useRouter } from 'next/router';
import { setAuth } from 'utils/auth';
import { Oval } from 'react-loader-spinner';

const Callback = () => {
  const router = useRouter();
  const { code, session_state, state } = router.query;
  const [{ loading, error }, setStatus] = useState({
    loading: false,
    error: false,
  });

  useEffect(() => {
    const verify = async () => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        };
        setStatus({ loading: true, error: false });
        let res = await fetch('/api/get-auth-token', requestOptions);
        res = await res.json();

        const { access_token, expires_in, id_token, given_name, userid, extenalid, refresh_token, email } = res as any;

        if (!(access_token && id_token)) {
          setStatus({ loading: false, error: true });
        } else {
          setStatus({ loading: false, error: false });
          setAuth({
            code: code.toString(),
            session_state: session_state.toString(),
            id_token,
            access_token,
            expires_in,
            given_name,
            userid,
            extenalid,
            refresh_token,
            email,
          });
        }
      } catch (error) {
        console.log('callback error >>', error);
        setStatus({ loading: false, error: true });
      }
    };

    if (code && session_state) {
      verify();
    }
    if (state && !session_state && !code) {
      window.location.href = '/';
    }
  }, [code, session_state, state]);

  return (
    <>
      <SEO title='Callback' desc='Callback Description' />
      <div className='p-4 mx-auto max-w-7xl'>
        {loading && (
          <div className='grid place-items-center'>
            <Oval color='#00AEEF' width={80} secondaryColor='#bae6fd' height={80} />
          </div>
        )}
        {error && <div>error: {error}</div>}
      </div>
    </>
  );
};

export default Callback;

Callback.auth = false;

Callback.Layout = MainLayout;
