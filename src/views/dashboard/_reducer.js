import * as TYPES from './_types';

const initialState = {
  loading: true,
  error: []
};

export default function channels(state = initialState, action) {
  switch (action.type) {
    case TYPES.FETCH_USER_ACTIVITY:
      return { ...state, loading: true };

    case TYPES.FETCH_USER_ACTIVITY_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false
      };

    case TYPES.FETCH_USER_ACTIVITY_FAILURE:
      return { ...state };

    default:
      return state;
  }
}
