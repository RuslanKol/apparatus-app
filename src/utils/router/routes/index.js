import React, { Component } from 'react';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PublicUnauth from './PublicUnauth';

class RenderRoute extends Component {
  components = {
    private: PrivateRoute,
    public: PublicRoute,
    unauth: PublicUnauth
  };

  render() {
    const TagName = this.components[this.props.type || 'public'];

    return <TagName {...this.props} />;
  }
}
export default RenderRoute;
