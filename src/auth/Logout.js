import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logoutUser } from './_actions';

class Logout extends Component {
  componentDidMount() {
    this.props.logoutUser();
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { logoutUser })(Logout);
