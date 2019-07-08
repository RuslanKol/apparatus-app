import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from 'components/layouts/Header';
import Footer from 'components/layouts/Footer';
import Sidebar from 'components/layouts/Sidebar';

class App extends Component {
  render() {
    const routeType = this.props.type;

    return (
      <div className={routeType === 'private' ? 'content private' : 'content'}>
        <Header {...this.props} key={this.props.location.pathname + 'header'} />
        {routeType === 'private' ? <Sidebar /> : null}
        <main id="main" className="main">
          {this.props.children}
        </main>
        {!routeType === 'private' ? <Footer key={this.props.location.pathname + 'footer'} /> : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {}
)(withRouter(App));
