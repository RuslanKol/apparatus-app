import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import App from 'components/layouts/App';

const PublicUnauth = ({ component: Component, ...rest }) => (
  <Route
    exact
    {...rest}
    render={props =>
      !rest.authenticated ? (
        <App routeType="unauth">
          <Component {...props} />
        </App>
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PublicUnauth;
