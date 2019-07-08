import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from './rootReducers';
import { saveState, loadState } from 'utils/helpers/storage';

const preloadedState = loadState();
const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require('redux-logger');

  middlewares.push(logger);
}

const middleWare = applyMiddleware(...middlewares);

const initialState = {
  auth: {
    authenticated: false,
    token: null
  },
  legal: {
    cookies: {
      accepted: false
    }
  }
};

function configureStore(init = preloadedState) {
  let state = init;

  if (typeof state === 'undefined') {
    state = initialState;
  }

  return createStore(reducers, state, middleWare);
}

const store = configureStore();

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    legal: store.getState().legal
  });
});

export default store;
