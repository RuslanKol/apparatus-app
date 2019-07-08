import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import App from 'components/layouts/App';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    render={props => {
      return rest.authenticated ? (
        rest.userAcceptedTerms || props.location.pathname === '/logout' ? (
          <App routeType="private" className="private" {...rest}>
            <Component {...props} />
          </App>
        ) : (
          <Redirect
            to={{
              pathname: '/legal/terms-of-service',
              state: { from: props.location }
            }}
          />
        )
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

export default PrivateRoute;
