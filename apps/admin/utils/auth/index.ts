/*
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 02 June 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import envConfig from '@/config';

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
  given_name: string;
  userid: string;
  extenalid: string;
  email: string;
};

const authKeySet = ['code', 'session_state', 'id_token', 'access_token', 'expires_in', 'refresh_token', 'given_name'];

export const setAuth = (authData: AuthLocal) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mt-user', JSON.stringify({ ...authData, expires_at: new Date().setSeconds(authData.expires_in) }));

    window.location.href = '/';
  }
};

export const getAuth = (): any => {
  if (typeof window !== 'undefined') {
    let authObj = localStorage.getItem('mt-user');
    if (authObj) {
      authObj = JSON.parse(authObj);
      const currentAuthKeys = Object.keys(authObj);
      if (authKeySet.every((i) => currentAuthKeys.includes(i))) {
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
