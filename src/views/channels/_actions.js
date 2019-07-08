import * as TYPES from './_types';
import { apiService } from 'utils/api';

export function fetchChannelsStart() {
  return { type: TYPES.FETCH_CHANNELS };
}

export function fetchChannelsSuccess(channels) {
  return { type: TYPES.FETCH_CHANNELS_SUCCESS, payload: channels };
}

export function fetchChannelsFail(error) {
  return { type: TYPES.FETCH_CHANNELS_FAILURE, payload: error };
}

export function fetchChannels() {
  return dispatch => {
    dispatch(fetchChannelsStart());
    return apiService
      .get('/channels')
      .then(response => {
        dispatch(fetchChannelsSuccess(response.data));
        return response.data;
      })
      .catch(error => {
        dispatch(fetchChannelsFail(error));
      });
  };
}
