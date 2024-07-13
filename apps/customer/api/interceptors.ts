import { NETWORK_STATUS_CODES } from '@/constants';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAuth, setAuth } from 'utils/auth';

const refreshAccessToken = async () => {
  let auth = getAuth();
  const currentTimestamp = new Date().getTime();
  if (auth && auth.expires_at > currentTimestamp) {
    return auth.access_token;
  }

  const requestOptions = {
    'Content-Type': 'application/json',
    method: 'POST',
    body: ``,
  };

  let url = '/api/get-client-token';

  if (auth) {
    requestOptions.body = JSON.stringify({ refresh_token: auth.refresh_token });

    url = '/api/refresh-access-token';
  }
  const res = await (await fetch(url, requestOptions)).json();

  if (res.statusCode === 401) {
    if (typeof window !== 'undefined') {
      setAuth(null);
    }
  }

  if (typeof window !== 'undefined' && res.access_token) {
    setAuth({
      ...auth,
      ...res,
    });
  }
  return res.access_token;
};

const setNetworkStatus = (code?: string) => {
  if (typeof window !== 'undefined' && typeof window['setNetwork'] !== 'undefined') {
    if (NETWORK_STATUS_CODES.includes(code)) {
      window['setNetwork'](false, 'Service unavailable.');
    } else {
      window['setNetwork'](true);
    }
  }
};

/**
 * EXAMPLE: https://codepen.io/shihab-live/pen/PozaObO
 */
const initInterceptors = (httpService: AxiosInstance) => {
  httpService.interceptors.request.use(
    (request: AxiosRequestConfig) => {
      setNetworkStatus();
      if (typeof window !== 'undefined' && request.headers.Authorization) {
        const auth = getAuth();
        if (auth?.access_token) {
          request.headers.Authorization = 'Bearer ' + auth.access_token;
        }
      }

      return request;
    },
    (error) => {
      console.error('REQUEST INTERCEPTOR', error);
      // if (error.response) {
      //     return Promise.reject(error.response);
      // } else {
      //     return Promise.reject(error);
      // }
    },
  );

  httpService.interceptors.response.use(
    async (res: AxiosResponse) => {
      return res;
    },
    async (error) => {
      if (error.code === 'ERR_CANCELED') return;
      const originalRequest: AxiosRequestConfig = error.config;

      if (error.response.status !== 401 || originalRequest['_retry']) {
        setNetworkStatus(error.code);
        return Promise.reject(error);
      }

      originalRequest['_retry'] = true;
      const access_token = await refreshAccessToken();
      if (access_token) {
        // authHeader.Authorization = 'Bearer ' + access_token;
        originalRequest.headers['Authorization'] = 'Bearer ' + access_token;
        return httpService(originalRequest);
      } else {
        console.error('RESPONSE INTERCEPTOR OTHER', error);
        return Promise.reject(error);
      }
    },
  );
};

export default initInterceptors;
