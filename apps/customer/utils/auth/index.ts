/*
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 13 May 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

export const authNavigate = () => {
  const uri = `${process.env.NEXT_PUBLIC_AUTH_HOST}/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_AUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI}&scope=${process.env.NEXT_PUBLIC_AUTH_SCOPE}`;
  if (typeof window !== 'undefined') {
    window.location.href = uri;
  }
};

type AuthLocal = {
  code: string;
  session_state: string;
  id_token: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  userid: string;
  given_name: string;
  userType: string;
  externalid: string;
  additionalDesignation: string;
  additionalEmail: string;
  additionalFirstName: string;
  additionalIdentifier: string;
  additionalLastName: string;
  additionalMobileNo: string;
  address1: string;
  address2: string;
  brnDocument: string;
  businessRegistrationNumber: string;
  companyAddress: string;
  companyName: string;
  country: string;
  designation: string;
  email: string;
  firstName: string;
  identifier: string;
  identifierDoc: string;
  inCorpCertificate: string;
  lastName: string;
  mobileNo: string;
  proofOfAddressDoc: string;
  registrationType: string;
  status: string;
  vatCertificate: string;
};

const authKeySet = ['code', 'session_state', 'id_token', 'access_token', 'expires_in', 'refresh_token'];

export const setAuth = (authData: AuthLocal | { access_token: string; expires_in: number; grant_type?: string }, clientToken = false) => {
  if (typeof window !== 'undefined') {
    if (authData === null) {
      window.location.href = '/logout';
      return;
    }

    localStorage.setItem(
      clientToken ? 'mt-client' : 'mt-user',
      JSON.stringify({
        ...authData,
        expires_at: new Date().setSeconds(authData.expires_in),
      }),
    );

    // const redirect_uri = localStorage.getItem('redirect');
    // if (redirect_uri) {
    //   console.info('SET_AUTH REDIRECTION', redirect_uri);
    //   localStorage.removeItem('redirect');
    //   window.location.href = redirect_uri;
    // } else if (reloadPage) {
    // if (reloadPage) {
    //   console.info('SET_AUTH RELOAD', '/');
    //   window.location.href = localStorage.getItem('redirect') || '/';
    // }
  }
};

export const getAuth = (clientToken = false): any => {
  if (typeof window !== 'undefined') {
    let authObj = localStorage.getItem('mt-user');
    if (authObj) {
      authObj = JSON.parse(authObj);
      const currentAuthKeys = Object.keys(authObj);
      if (authKeySet.every((i) => currentAuthKeys.includes(i)) || clientToken) {
        return authObj;
      }
    }
  }
  return false;
};

export const isLoggedIn = () => {
  return Boolean(getAuth());
};

export const logout = async () => {
  const { id_token, session_state } = getAuth();
  const uri = `${process.env.NEXT_PUBLIC_AUTH_HOST}/oidc/logout?id_token_hint=${id_token}&post_logout_redirect_uri=${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI}&state=${session_state}`;
  if (typeof window !== 'undefined') {
    localStorage.clear();
    window.location.href = uri;
  }
};
