/* eslint @typescript-eslint/no-var-requires: "off" */
import base64 from 'base-64';

export default async function handler(req, res) {
  const { code } = req.body;
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const encodedCreadentials = base64.encode(process.env.NEXT_PUBLIC_AUTH_CLIENT_ID + ':' + process.env.AUTH_SECRET);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encodedCreadentials}`,
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI}`,
    };

    const response = await fetch(`${process.env.NEXT_INTERNAL_AUTH_HOST}/oauth2/token`, requestOptions);
    const jsonResponse = await response.json();

    const { access_token } = jsonResponse;

    const config = {
      headers: { Authorization: `Bearer ${access_token}` },
    };

    const reponse2 = await fetch(`${process.env.NEXT_INTERNAL_AUTH_HOST}/oauth2/userinfo`, config);
    const jsonResponse2 = await reponse2.json();

    const responseCombined = { ...jsonResponse, ...jsonResponse2 };

    res.status(200).send(responseCombined);
  } catch (err) {
    console.error('GET_AUTH_TOKEN_ERROR', err);
    res.status(500).send({ error: err });
  }
}
