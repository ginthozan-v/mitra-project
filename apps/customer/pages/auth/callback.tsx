/*
 * File: callback.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 10 May 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { useEffect, useState } from 'react';
import SEO from 'components/utils/SEO';
import { useRouter } from 'next/router';
import { setAuth } from 'utils/auth';
import Loader from '@mtcloud/ui/atoms/Loader';

const Callback = () => {
  const router = useRouter();
  const { code, session_state, state } = router.query;
  const [{ loading, error }, setStatus] = useState({
    loading: false,
    error: false,
  });

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

      const { access_token, expires_in, id_token, refresh_token, userid, given_name, userType, externalid } = res as any;

      if (!(access_token && id_token)) {
        setStatus({ loading: false, error: true });
      } else {
        const reqOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        };

        let response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${process.env.NEXT_PUBLIC_API_VERSION}/user`, reqOptions);

        response = await response.json();

        const {
          additionalDesignation,
          additionalEmail,
          additionalFirstName,
          additionalIdentifier,
          additionalLastName,
          additionalMobileNo,
          address1,
          address2,
          brnDocument,
          businessRegistrationNumber,
          companyAddress,
          companyName,
          country,
          designation,
          email,
          firstName,
          identifier,
          identifierDoc,
          inCorpCertificate,
          lastName,
          mobileNo,
          proofOfAddressDoc,
          registrationType,
          status,
          vatCertificate,
        } = response as any;

        setAuth({
          code: code.toString(),
          session_state: session_state.toString(),
          id_token,
          access_token,
          expires_in,
          refresh_token,
          userid,
          given_name,
          userType,
          externalid,
          additionalDesignation,
          additionalEmail,
          additionalFirstName,
          additionalIdentifier,
          additionalLastName,
          additionalMobileNo,
          address1,
          address2,
          brnDocument,
          businessRegistrationNumber,
          companyAddress,
          companyName,
          country,
          designation,
          email,
          firstName,
          identifier,
          identifierDoc,
          inCorpCertificate,
          lastName,
          mobileNo,
          proofOfAddressDoc,
          registrationType,
          status,
          vatCertificate,
        });
        window.location.href = localStorage.getItem('redirect') || '/';
      }
    } catch (error) {
      setStatus({ loading: false, error: true });
      console.error('CALLBACK_PAGE_ERROR', error);
    }
  };

  useEffect(() => {
    if (code && session_state) {
      verify();
    }
    if (state && !session_state && !code) {
      console.info('AUTH/CALLBACK REDIRECTION', '/');
      // router.push('/');
      window.location.href = localStorage.getItem('redirect') || '/';
    }
  }, [code, session_state, state]);

  return (
    <>
      <SEO title='Callback' desc='Callback Description' />
      <div className='max-w-7xl mx-auto p-4 h-screen'>
        {loading && <Loader>Please wait while we log you in...</Loader>}
        {error && (
          <div className='text-center font-medium flex justify-center items-center h-full' style={{ textShadow: '2px 2px 2px rgb(0 0 0 / 15%)' }}>
            <div className='p-3 space-y-2'>
              <p>Sorry, something went wrong while logging you in.</p>
              <p>We hope you wouldn&apos;t mind trying again later.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Callback;
