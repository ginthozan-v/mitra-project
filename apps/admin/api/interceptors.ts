import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { NETWORK_STATUS_CODES } from '../constants';
import { getAuth, setAuth } from 'utils/auth';

const refreshAccessToken = async () => {
  const auth = getAuth();
  const currentTimestamp = new Date().getTime();
  if (auth && auth.expires_at > currentTimestamp) {
    return auth.access_token;
  }

  const requestOptions = {
    'Content-Type': 'application/json',
    method: 'POST',
    body: ``,
  };

  let url = '';

  if (auth) {
    requestOptions.body = JSON.stringify({ refresh_token: auth.refresh_token });
    url = '/api/refresh-access-token';
  }

  const res = await (await fetch(url, requestOptions)).json();

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
      const auth = getAuth();
      if (auth?.access_token) {
        request.headers.Authorization = `Bearer ${auth.access_token}`;
      }
      if (request.url.includes('download')) {
        request.responseType = 'blob';
      }

      return request;
    },
    (error) => {
      console.log('🚀 api line:34', error);
      return Promise.reject(error);
    },
  );

  httpService.interceptors.response.use(
    async (res: AxiosResponse) => {
      return res;
    },
    async (error) => {
      const originalRequest: AxiosRequestConfig = error.config;

      if (error?.response?.status !== 401 || originalRequest['_retry']) {
        setNetworkStatus(error.code);
        return Promise.reject(error)
      };
      originalRequest['_retry'] = true;
      const access_token = await refreshAccessToken();
      if (access_token) {
        originalRequest.headers['Authorization'] = 'Bearer ' + access_token;
        return httpService(originalRequest);
      } else {
        return Promise.reject(error);
      }
    },
  );
};

export default initInterceptors;
