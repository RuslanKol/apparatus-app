import * as TYPES from './_types';
import { apiService, setToken } from 'utils/api';
import { deleteCookie } from 'utils/helpers/storage';
import { successHandler, errorHandler } from 'utils/helpers/alerts';

export function logoutUser() {
  return function(dispatch) {
    dispatch({ type: TYPES.UNAUTH_USER });

    deleteCookie('authenticated');
    deleteCookie('jwt');
    deleteCookie('directive_id');

    return apiService
      .post('/logout')
      .then(response => {
        successHandler(dispatch, 'Successfully logged out.');

        return response;
      })
      .catch(error => {});
  };
}

function loginSuccess(data) {
  const { jwt, directive, user = {} } = data;
  return {
    type: TYPES.LOGIN_SUCCESS,
    payload: {
      jwt,
      directive_id: directive.id,
      email: user.email || ''
    }
  };
}

export function magicLinkLogin(params) {
  return function(dispatch) {
    dispatch({ type: TYPES.LOGIN });

    return apiService
      .post('/login/magic-link/confirm', params)
      .then(response => {
        if (response.data.success) {
          setToken(response.data.jwt);
          dispatch(loginSuccess(response.data));
          successHandler(dispatch, 'Successfully logged in.');
          return { success: true };
        } else {
          dispatch({ type: TYPES.LOGIN_ERROR });
          errorHandler(dispatch, { data: { error: 'error', message: 'Invalid magic link.' } });
          return { success: false };
        }
      })
      .catch(error => {
        dispatch({ type: TYPES.LOGIN_ERROR });
        errorHandler(dispatch, { data: { error: 'error', message: 'An error has occured.' } });
        return { success: false };
      });
  };
}

export function login(params) {
  return function(dispatch) {
    dispatch({ type: TYPES.LOGIN });

    if (params.jwt) {
      setToken(params.jwt);
      dispatch({
        type: TYPES.LOGIN_SUCCESS,
        payload: { jwt: params.jwt, directive_id: params.directive.id }
      });
      successHandler(dispatch, 'Successfully logged in.');
      return { success: true };
    } else {
      dispatch({ type: TYPES.LOGIN_ERROR });
      errorHandler(dispatch, { data: { error: 'error', message: 'Could not Log In' } });
      return { success: false };
    }
  };
}

export function getToken() {
  return function(dispatch) {
    dispatch({ type: TYPES.SECURE_FETCH_TOKEN });

    return apiService
      .get('/token')
      .then(response => {
        dispatch({ type: TYPES.SECURE_FETCH_TOKEN_SUCCESS });
        //payload: { token: response.data.jwt, directive_id: response.data.directive_id }

        setToken(response.data.token);
        return response.data.token;
      })
      .catch(error => {
        dispatch({ type: TYPES.SECURE_FETCH_TOKEN_ERROR, error });
      });
  };
}

export function magicLinkSucceed(msg) {
  return dispatch => {
    dispatch({ type: TYPES.MAGIC_LINK_SUCCESS });
    successHandler(dispatch, msg);
  };
}

export function magicLinkFailed(error) {
  return dispatch => {
    dispatch({ type: TYPES.MAGIC_LINK_FAILURE });
    errorHandler(dispatch, { data: { error: error.code, message: error.message } });
  };
}

export function sendMagicLink(data) {
  return dispatch => {
    dispatch({ type: TYPES.MAGIC_LINK_SEND });

    return apiService
      .post('login/magic-link', data)
      .then(response => {
        dispatch(magicLinkSucceed('A magic link has been send to your email.'));
        return response;
      })
      .catch(error => {
        if (error.data) {
          error = error.data;
          if (error.code !== 'user_not_found') dispatch(magicLinkFailed(error));
        }

        throw error;
      });
  };
}

export function registerSucceed(msg) {
  return dispatch => {
    dispatch({ type: TYPES.REGISTER_USER_SUCCEED });
    successHandler(dispatch, msg);
  };
}

export function registerFailed(error) {
  return dispatch => {
    dispatch({ type: TYPES.REGISTER_USER_FAILED });
    errorHandler(dispatch, { data: { error: error.code, message: error.message } });
  };
}

export function registerUser(data) {
  return dispatch => {
    dispatch({ type: TYPES.REGISTER_USER });

    return apiService
      .post('register', data)
      .then(response => {
        dispatch(registerSucceed('Email sent.'));
        return response;
      })
      .catch(error => {
        dispatch(registerFailed(error));
        throw error;
      });
  };
}
