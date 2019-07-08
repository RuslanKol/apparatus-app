import * as TYPES from './_types';
import { apiService } from 'utils/api';
import { userHasntAcceptedTerms } from 'views/legal/_actions';

export function fetchAccountStart() {
  return { type: TYPES.FETCH_ACCOUNT };
}

export function fetchAccountSuccess(account) {
  return { type: TYPES.FETCH_ACCOUNT_SUCCESS, payload: account };
}

export function fetchAccountFail(error) {
  return { type: TYPES.FETCH_ACCOUNT_FAILURE, payload: error };
}

export function fetchAccount(params) {
  return dispatch => {
    dispatch(fetchAccountStart());

    return apiService
      .get('/account')
      .then(response => {
        const { ...account } = response.data;

        if (account.user) {
          dispatch(fetchAccountSuccess(account.user));

          if (!account.user.has_accepted_terms) {
            dispatch(userHasntAcceptedTerms());
          }
        } else {
          dispatch(fetchAccountFail(response));
        }

        return response.data;
      })
      .catch(error => {
        dispatch(fetchAccountFail(error));
      });
  };
}
