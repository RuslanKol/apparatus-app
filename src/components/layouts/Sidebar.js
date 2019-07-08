import React, { Component } from 'react';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'reactstrap';

import SvgRender from 'components/helpers/SvgRender';

import logoIcon from 'assets/svg/logo.svg';
import logoIdentityChannel from 'assets/svg/Identity Channels.svg';
import logoUsers from 'assets/svg/Users.svg';
import logoSettings from 'assets/svg/Settings.svg';
import arrowIcon from 'assets/svg/arrow_dropdown.svg';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  }

  render() {
    return (
      <div className={!this.state.sidebarOpen ? 'sidebar hide' : 'sidebar show'}>
        <button
          onClick={this.toggle}
          className={!this.state.sidebarOpen ? 'sidebar-toggle hide' : 'sidebar-toggle show'}
        >
          <SvgRender path={arrowIcon} />
        </button>
        <div className="navbar-brand">
          <SvgRender path={logoIcon} svgClassName="logo-height" />
        </div>
        <Nav className="sidebar-nav">
          <NavItem>
            <NavLink activeClassName="active" to="/channels">
              <SvgRender path={logoIdentityChannel} />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink activeClassName="active" to="/users">
              <SvgRender path={logoUsers} />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink activeClassName="active" to="/settings">
              <SvgRender path={logoSettings} />
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(Sidebar)
);
