import React, { Component } from 'react';
import { connect } from 'react-redux';
class Dashboard extends Component {
  render() {
    return (
      <div className="dash-wrapper d-flex align-items-center justify-content-center">
        <h1>Dashboard</h1>
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
)(Dashboard);
