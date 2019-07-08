import * as TYPES from './_types';
import { apiService } from 'utils/api';
import { errorHandler } from 'utils/helpers/alerts';

export function submitStep1Failed(error) {
  return dispatch => {
    dispatch({ type: TYPES.FETCH_FORM_1_SUBMIT_ERROR });
    errorHandler(dispatch, { data: { error: error.code, message: error.message } });
    return Promise.reject(error);
  };
}
export function submitStep1(params) {
  return function(dispatch) {
    dispatch({ type: TYPES.FETCH_FORM_1_SUBMIT });

    return apiService
      .post('devices/untrust', params)
      .then(response => {
        dispatch({
          type: TYPES.FETCH_FORM_1_SUBMIT_SUCCESS,
          payload: { data: response.data, params: params }
        });
        return response.data;
      })
      .catch(error => {
        dispatch(submitStep1Failed(error.data)).catch(error => {});
        return;
      });
  };
}

export function submitStep2Failed(error) {
  return dispatch => {
    dispatch({ type: TYPES.FETCH_FORM_2_SUBMIT_ERROR });
    errorHandler(dispatch, { data: { error: error.code, message: error.message } });
    return Promise.reject(error);
  };
}

export function submitStep2(code, email, mobile) {
  let formData = { code, email, mobile };

  return function(dispatch) {
    dispatch({ type: TYPES.FETCH_FORM_2_SUBMIT });

    return apiService
      .post('devices/untrust/confirm', formData)
      .then(response => {
        dispatch({
          type: TYPES.FETCH_FORM_2_SUBMIT_SUCCESS,
          payload: { data: response.data, params: formData }
        });
        return response.data;
      })
      .catch(error => {
        dispatch(submitStep2Failed(error.data)).catch(error => {});
        return;
      });
  };
}
