import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';

import auth from 'auth/_reducers';
import account from 'views/account/_reducer';
import legal from 'views/legal/_reducer';
import channels from 'views/channels/_reducer';
import activity from 'views/dashboard/_reducer';

const combinedReducer = combineReducers({
  routing,
  notifications,
  auth,
  account,
  legal,
  channels,
  activity
});

function rootReducers(state, action) {
  switch (action.type) {
    default:
      return combinedReducer(state, action);
  }
}

export default rootReducers;
