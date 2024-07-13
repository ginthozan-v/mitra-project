/**
 * File: refresh-access-token.ts
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 11 August 2022, 12:37
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

/* eslint @typescript-eslint/no-var-requires: "off" */
import base64 from 'base-64';
import envConfig from '@/config';

export default async function handler(req, res) {
  try {
    const { refresh_token } = JSON.parse(req.body);

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const encodedCredentials = base64.encode(
      `${process.env.NEXT_PUBLIC_AUTH_CLIENT_ID}:${process.env.AUTH_SECRET}`
    );

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encodedCredentials}`,
      },
      body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
    };

    const tokenResponse = await (
      await fetch(
        `${process.env.NEXT_INTERNAL_AUTH_HOST}/oauth2/token`,
        requestOptions
      )
    ).json();

    console.log('@x-regenerating-access_token', tokenResponse);

    res.status(200).send(tokenResponse);
  } catch (err) {
    console.log('@x-', 'node js error');
    console.error(err);
    res.status(500).send({ error: err });
  }
}
