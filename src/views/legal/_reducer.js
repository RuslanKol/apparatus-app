import * as TYPES from './_types';
import * as ACCOUNT_TYPES from 'views/account/_types';
import _get from 'lodash/get';

const init = {
  terms: {
    accepted: false
  },
  cookies: {
    accepted: false
  }
};

export default function legal(state = init, action) {
  switch (action.type) {
    case TYPES.USER_MUST_ACCEPT_TERMS:
      return {
        ...state,
        terms: {
          ...state.terms,
          accepted: false
        }
      };
    case TYPES.ACCEPT_TERMS_SUCCESS:
      return {
        ...state,
        terms: {
          ...state.terms,
          accepted: true
        },
        temp: { jwt: null }
      };

    case TYPES.COOKIES_ACCEPTED:
      return {
        ...state,
        cookies: {
          ...state.cookies,
          accepted: true
        }
      };

    case ACCOUNT_TYPES.FETCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        terms: {
          ...state.terms,
          accepted: action.payload && action.payload.has_accepted_terms ? true : false
        }
      };

    default:
      return state;
  }
}

export function hasUserAcceptedTerms(state) {
  return _get(state, 'legal.terms.accepted', false);
}

export function getTempJWT(state) {
  return _get(state, 'legal.temp.jwt', null);
}
