import axios from 'axios';
import qs from 'qs';
import MockAdapter from 'axios-mock-adapter';

import { getToken } from '../../auth/_actions';
import { loadState, deleteCookie } from 'utils/helpers/storage/index';
import * as TYPES from '../../auth/_types';

import { errorHandler } from 'utils/helpers/alerts';

const API_URL = process.env.REACT_APP_API_URL;
let httpMock = null;

if (process.env.NODE_ENV === 'test') {
  httpMock = new MockAdapter(axios);
}

const state = loadState();
let jwt = null;

if (state && state.auth && state.auth.jwt) {
  if (state.auth.jwt) jwt = state.auth.jwt;
}

axios.defaults.headers.common.Accept = 'application/json';
setToken(jwt);

// Interceptors -----------------------------------------
const service = axios.create({
  baseURL: API_URL
});

const tempService = axios.create({
  baseURL: API_URL
});

const blobService = axios.create({
  baseURL: API_URL,
  responseType: 'blob'
});

const apiServices = [service, blobService];

// ----- Before
service.interceptors.request.use(
  config => {
    config.paramsSerializer = params => {
      return qs.stringify(params, {
        arrayFormat: 'brackets'
      });
    };
    return config;
  },
  () => {
    return Promise.reject();
  }
);

// ----- After
export function setupResponseInterceptors(store) {
  // Add a response interceptor
  apiServices.forEach(s => {
    s.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
        if (!error.response) {
          /* Something went really wrong, a bugsnag record should be created here */
          errorHandler(store.dispatch, { data: error.message }); //notify user
          return Promise.reject(error); //notify caller
        }

        switch (error.response.status) {
          case 401:
            switch (error.response.data.code) {
              case 'token_expired':
                store.dispatch({ type: TYPES.UNAUTH_USER });
                deleteCookie('token');
                break;
              case 'jwt_expired':
                return renewGuestToken(error, store);
              default:
                break;
            }

            break;
          case 400:
            switch (error.response.data.error) {
              case 'token_invalid':
              case 'token_not_provided':
                store.dispatch({ type: TYPES.UNAUTH_USER });
                deleteCookie('token');
                break;
              default:
                break;
            }

            switch (error.response.data.code) {
              case 'expired_magic_link':
                errorHandler(store.dispatch, { data: { message: error.response.data.message } });
              default:
                break;
            }

            break;
          default:
            return Promise.reject(error.response);
        }

        return Promise.reject(error.response);
      }
    );
  });
}
// ------------------------------------------------------

/**
 * Renew guest token and retry request.
 * @param response
 * @param store
 * @returns {undefined|PromiseLike<AxiosResponse<any>>|Promise<AxiosResponse<any>>|void}
 */
function renewGuestToken(response, store) {
  const initialRequest = response.config;
  return store.dispatch(getToken()).then(token => {
    // update token for other requests
    setToken(token);
    // retry request with the new token
    initialRequest.headers['Authorization'] = `Bearer ${token}`;
    return apiService.request(response.config);
  });
}

// Instance -------------------------------------------
export const apiService = service;
export const apiBlobService = blobService;
export const apiTempService = tempService;
export const mock = httpMock;

export function setToken(jwt) {
  axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
}

export function setTempToken(jwt) {
  tempService.defaults.headers.common.Authorization = `Bearer ${jwt}`;
}
