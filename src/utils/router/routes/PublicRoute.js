import React from 'react';
import { Route } from 'react-router-dom';
import App from 'components/layouts/App';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    exact
    {...rest}
    render={props => (
      <App routeType="public">
        <Component {...props} />
      </App>
    )}
  />
);

export default PublicRoute;
