import * as TYPES from './_types';

const INITIAL_STATE = {
  authenticated: false,
  jwt: null,
  directive_id: null,
  loading: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        jwt: null,
        directive_id: null
      };
    case TYPES.LOGIN_ERROR:
      return {
        ...state,
        authenticated: false,
        jwt: null
      };
    case TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        jwt: action.payload.jwt,
        directive_id: action.payload.directive_id
      };
    case TYPES.MAGIC_LINK_SEND:
      return {
        ...state,
        loading: true
      };
    case TYPES.MAGIC_LINK_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case TYPES.MAGIC_LINK_FAILURE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

export const getAuthenticated = state => state.auth.authenticated;
