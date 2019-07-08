import React, { Component } from 'react';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import SvgRender from 'components/helpers/SvgRender';
import { getAuthenticated } from 'auth/_reducers';
import { getAccount } from '../../views/account/_selectors';

import logo from 'assets/svg/logo_full.svg';
import logoIcon from 'assets/svg/logo.svg';
import facebook from 'assets/svg/social/facebook.svg';
import twitter from 'assets/svg/social/twitter.svg';
import linkedIn from 'assets/svg/social/linkedIn.svg';
import profileIcon from 'assets/svg/Profile icon.svg';
import dashboardIcon from 'assets/svg/Dashboard icon.svg';
import logoutIcon from 'assets/svg/Shape Copy 3.svg';
import profileImgIcon from 'assets/svg/Default profile image_avatar.svg';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      dropdownOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
  }

  toggle() {
    if (!this.state.isOpen) {
      document.querySelector('html').classList.add('prevent-scroll');
    } else {
      document.querySelector('html').classList.remove('prevent-scroll');
    }

    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  dropdownToggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentWillUnmount() {
    document.querySelector('html').classList.remove('prevent-scroll');
  }

  renderLogoOnly() {
    return (
      <div className="header">
        <Navbar className="justify-content-center">
          <SvgRender path={logo} svgClassName="logo-height" />
        </Navbar>
      </div>
    );
  }

  render() {
    if (this.props.location.pathname.startsWith('/trust/')) {
      return this.renderLogoOnly();
    }
    const routePrivate = this.props.type === 'private';
    const pageTitle = this.props.title;
    return (
      <div className={this.props.authenticated ? 'header logged ' : 'header'}>
        <Navbar expand="lg">
          {!routePrivate ? (
            <NavLink to={'/'} className="navbar-brand">
              <SvgRender path={logo} svgClassName="logo-height" />
            </NavLink>
          ) : (
            <h3 className="page-title">{pageTitle}</h3>
          )}

          <NavbarToggler
            id="menu-toggle"
            className={'hamburger hamburger--squeeze btn' + (this.state.isOpen ? ' open' : '')}
            onClick={e => this.toggle()}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </NavbarToggler>

          <Collapse
            id="navbarMenu"
            isOpen={this.state.isOpen}
            className="justify-content-between navbar-collapse"
            navbar
          >
            <Nav className="navbar-header-nav">
              {!routePrivate ? (
                <NavItem>
                  <a href="http://docs.apparatusapp.com/" className="navigation-link">
                    For Developers
                  </a>
                </NavItem>
              ) : null}

              {!this.props.authenticated ? (
                <NavItem>
                  <Link to="/login" className="no-line reverse btn withBorder">
                    Log In
                  </Link>
                </NavItem>
              ) : (
                <NavItem className={routePrivate ? 'navbar-avatar' : 'navbar-avatar bordered'}>
                  <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle}>
                    <DropdownToggle className="navbar-avatar-btn" caret>
                      <span className="avatar-img">
                        {this.props.account.image ? (
                          <img src={this.props.account.image} className="img-fluid" alt="user" />
                        ) : (
                          <SvgRender path={profileImgIcon} />
                        )}
                      </span>
                      <span className="navbar-avatar-name">{this.props.account.name}</span>
                    </DropdownToggle>
                    <DropdownMenu right className="navbar-avatar-menu">
                      <DropdownItem>
                        {!routePrivate ? (
                          <NavItem>
                            <NavLink to="/channels">
                              <SvgRender path={dashboardIcon} />
                              Go to Dashboard
                            </NavLink>
                          </NavItem>
                        ) : (
                          <NavItem>
                            <NavLink to="/">
                              <SvgRender path={logoIcon} />
                              Public site
                            </NavLink>
                          </NavItem>
                        )}
                      </DropdownItem>
                      <DropdownItem>
                        <NavItem>
                          <NavLink to="/profile">
                            <SvgRender path={profileIcon} />
                            Profile
                          </NavLink>
                        </NavItem>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        <NavItem>
                          <NavLink to="/logout">
                            <SvgRender path={logoutIcon} />
                            Log out
                          </NavLink>
                        </NavItem>
                      </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </NavItem>
              )}
            </Nav>
            <div className="menu-footer w-100 align-items-center justify-content-between px-5 d-flex d-lg-none">
              <Link to="/legal/privacy-policy" className="legal d-block d-lg-none mb-0">
                Legal Documents
              </Link>
              <div className="social-wrap d-flex d-lg-none align-items-center">
                <a href="https://www.facebook.com/apparatusapp" target="_blank">
                  <SvgRender style={{ height: 16 }} path={facebook} svgClassName="white-svg" />
                </a>
                <a href="#" className="ml-2 mr-2" target="_blank">
                  <SvgRender style={{ height: 16 }} path={twitter} svgClassName="white-svg" />
                </a>
                <a href="#" target="_blank">
                  <SvgRender style={{ height: 16 }} path={linkedIn} svgClassName="white-svg" />
                </a>
              </div>
            </div>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: getAuthenticated(state),
    account: getAccount(state)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(Header)
);
