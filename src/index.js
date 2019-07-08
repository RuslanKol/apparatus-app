import 'bootstrap-daterangepicker/daterangepicker.css';
import 'assets/scss/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import AppRouter from 'utils/router';
import { setupResponseInterceptors } from 'utils/api';
import store from 'utils/store';
import history from 'utils/history';

syncHistoryWithStore(history, store);
setupResponseInterceptors(store);

ReactDOM.render(
  <Provider store={store}>
    <AppRouter history={history} />
  </Provider>,
  document.getElementById('root')
);
