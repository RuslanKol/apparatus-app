import * as TYPES from './_types';
import { apiService } from 'utils/api';

export function checkToken(params) {
  return function(dispatch) {
    dispatch({ type: TYPES.TOKEN_SUBMIT });
    return apiService
      .post('devices/email-confirmation', params)
      .then(response => {
        dispatch({
          type: TYPES.TOKEN_SUBMIT_SUCCESS,
          payload: { data: response.data, params: params }
        });
        return response.data;
      })
      .catch(error => {
        dispatch({ type: TYPES.TOKEN_SUBMIT_ERROR });

        return error;
      });
  };
}
