/* eslint @typescript-eslint/no-var-requires: "off" */
import base64 from 'base-64';

export default async function handler(req, res) {
  try {
    const encodedCredentials = base64.encode(process.env.NEXT_PUBLIC_AUTH_CLIENT_ID + ':' + process.env.AUTH_SECRET);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encodedCredentials}`,
      },
      body: `grant_type=client_credentials&validity_period=3600`,
    };

    const response = await fetch(`${process.env.NEXT_INTERNAL_AUTH_HOST}/oauth2/token`, requestOptions);
    const jsonResponse = await response.json();

    res.status(200).send(jsonResponse);
  } catch (err) {
    res.status(500).send({ error: err });
  }
}
