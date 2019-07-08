import * as TYPES from './_types';

const initialState = {
  loading: true,
  error: []
};

export default function channels(state = initialState, action) {
  switch (action.type) {
    case TYPES.FETCH_CHANNELS:
      return { ...state, loading: true };

    case TYPES.FETCH_CHANNELS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false
      };

    case TYPES.FETCH_CHANNELS_FAILURE:
      return { ...state };

    default:
      return state;
  }
}
