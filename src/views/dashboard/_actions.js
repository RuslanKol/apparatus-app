import * as TYPES from './_types';
import { apiService } from 'utils/api';

export function fetchUserActivityStart() {
  return { type: TYPES.FETCH_USER_ACTIVITY };
}

export function fetchUserActivitySuccess(activity) {
  return { type: TYPES.FETCH_USER_ACTIVITY_SUCCESS, payload: activity };
}

export function fetchUserActivityFail(error) {
  return { type: TYPES.FETCH_USER_ACTIVITY_FAILURE, payload: error };
}

export function fetchUserActivity(params) {
  return dispatch => {
    dispatch(fetchUserActivityStart());
    return apiService
      .get(`/channels/activity`, {
        params: params
      })
      .then(response => {
        dispatch(fetchUserActivitySuccess(response.data));
        return response.data;
      })
      .catch(error => {
        dispatch(fetchUserActivityFail(error));
      });
  };
}
