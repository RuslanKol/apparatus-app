import * as TYPES from './_types';
import * as LEGAL_TYPES from 'views/legal/_types';
import { LOGIN_SUCCESS } from 'auth/_types';

const initialState = {};

export default function account(state = initialState, action) {
  switch (action.type) {
    case TYPES.FETCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        email: action.payload.email
      };

    case LEGAL_TYPES.ACCEPT_TERMS_SUCCESS:
      return {
        ...state,
        has_accepted_terms: true
      };

    case LEGAL_TYPES.TERMS_CONFIRM_SUCCESS:
      return {
        ...state,
        ...action.payload.user
      };

    default:
      return state;
  }
}
