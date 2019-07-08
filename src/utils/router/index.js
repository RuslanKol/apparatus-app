import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import Notifications from 'react-notification-system-redux';

import ContentWrapper from 'components/layouts/ContentWrapper';
import RenderRoute from './routes';
import authRoutes from 'auth/_routes';
import Home from 'views/home';
import NotFound from 'views/NotFound';
import Trust from 'views/trust';
import Untrust from 'views/untrust';
import legal from 'views/legal/_routes';
import dashboardRoutes from 'views/dashboard/_routes';
import channelsRoutes from 'views/channels/_routes';
import settingsRoutes from 'views/settings/_routes';
import usersRoutes from 'views/users/_routes';
import profileRoutes from 'views/profile/_routes';

import notificationStyle from 'utils/helpers/alerts/style';

import { getAuthenticated } from 'auth/_reducers';
import { fetchAccount } from 'views/account/_actions';
import { hasUserAcceptedTerms } from 'views/legal/_reducer';

const mergedRoutes = [
  ...authRoutes,
  ...dashboardRoutes,
  ...legal,
  ...channelsRoutes,
  ...settingsRoutes,
  ...usersRoutes,
  ...profileRoutes
];

class AppRouter extends Component {
  componentDidMount() {
    this.props.history.listen((location, action) => {
      window.scrollTo(0, 0);
    });

    if (this.props.authenticated) {
      this.props.fetchAccount();
    }
  }

  render() {
    const { notifications, authenticated, userAcceptedTerms } = this.props;

    return (
      <Router history={this.props.history}>
        <ContentWrapper>
          <Switch>
            {mergedRoutes.map((route, i) => (
              <RenderRoute
                key={i}
                authenticated={authenticated}
                userAcceptedTerms={userAcceptedTerms}
                {...route}
              />
            ))}

            <RenderRoute exact path="/" component={Home} />
            <RenderRoute exact path="/trust/:token" component={Trust} />
            <RenderRoute exact path="/untrust" component={Untrust} />
            <Route component={NotFound} />
          </Switch>
          <Notifications notifications={notifications} style={notificationStyle} />
        </ContentWrapper>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: getAuthenticated(state),
    userAcceptedTerms: hasUserAcceptedTerms(state),
    notifications: state.notifications
  };
}

export default connect(
  mapStateToProps,
  { fetchAccount }
)(AppRouter);
