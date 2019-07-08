import { apiService } from 'utils/api';
import * as TYPES from './_types';

import { deleteCookie } from 'utils/helpers/storage';
import { successHandler, errorHandler } from 'utils/helpers/alerts';

export function userHasntAcceptedTerms() {
  deleteCookie('accepted_terms');

  return {
    type: TYPES.USER_MUST_ACCEPT_TERMS
  };
}

function acceptTermsStart() {
  return { type: TYPES.ACCEPT_TERMS };
}

function acceptTermsSuccess() {
  return { type: TYPES.ACCEPT_TERMS_SUCCESS };
}

export function acceptTerms(params) {
  return dispatch => {
    dispatch(acceptTermsStart());

    return apiService
      .post('/terms/accept', params)
      .then(response => {
        const { success } = response.data;

        if (success) {
          dispatch(acceptTermsSuccess());
          successHandler(dispatch, 'Terms accepted');
        }

        return response.data;
      })
      .catch(error => {
        errorHandler(dispatch, {
          data: { error: error.data.code || null, message: error.data.message || null }
        });
        dispatch({
          type: TYPES.ACCEPT_TERMS_FAILURE,
          payload: error
        });
      });
  };
}

export function acceptCookies(params) {
  return function(dispatch) {
    dispatch({
      type: TYPES.COOKIES_ACCEPTED,
      payload: { accepted: true }
    });
  };
}

export function directTerms(code) {
  return dispatch => {
    dispatch({ type: TYPES.TERMS_CONFIRM });

    return apiService
      .get(`/terms/magic-link/info/${code}`)
      .then(response => {
        dispatch({ type: TYPES.TERMS_CONFIRM_SUCCESS, payload: response.data });

        return response.data;
      })
      .catch(error => {
        errorHandler(dispatch, {
          data: { error: error.data.code || null, message: error.data.message || null }
        });
        dispatch({
          type: TYPES.TERMS_CONFIRM_FAILURE,
          payload: error
        });
      });
  };
}
