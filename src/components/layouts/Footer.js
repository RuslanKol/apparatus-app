import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import { getAuthenticated } from 'auth/_reducers';
import { getAccount } from 'views/account/_selectors';
import { acceptCookies } from 'views/legal/_actions';
import AcceptTerms from 'views/legal/AcceptTerms';
import { hasUserAcceptedTerms } from 'views/legal/_reducer';
import { acceptTerms } from 'views/legal/_actions';

import SvgRender from 'components/helpers/SvgRender';
import facebook from 'assets/svg/social/facebook.svg';
import twitter from 'assets/svg/social/twitter.svg';
import linkedIn from 'assets/svg/social/linkedIn.svg';

class Footer extends Component {
  constructor() {
    super();

    this.acceptCookiesHandler = this.acceptCookiesHandler.bind(this);
  }

  acceptCookiesHandler() {
    this.props.acceptCookies();
    document.body.classList.remove('blurred');
  }

  componentDidMount() {
    let page = this.props.location.pathname;

    if (
      !this.props.userAcceptedCookies &&
      !page.startsWith('/legal/') &&
      !page.startsWith('/trust/')
    )
      document.body.classList.add('blurred');
  }

  componentWillUnmount() {
    if (!this.props.userAcceptedCookies) {
      document.body.classList.remove('blurred');
    }
  }

  renderCopyrightsOnly() {
    return (
      <footer className="footer d-flex align-items-center justify-content-center">
        <div className="text-info">Apparatus App © 2018 All Rights Reserved</div>
      </footer>
    );
  }

  render() {
    if (this.props.location.pathname.startsWith('/trust/')) {
      return this.renderCopyrightsOnly();
    }

    return (
      <Fragment>
        <footer className="footer d-flex align-items-center justify-content-between">
          <div className="left-part text-info">Apparatus App © 2018 All Rights Reserved</div>
          <div className="right-part d-none d-lg-flex">
            <Link to="/untrust" className="reverse">
              My device is compromised
            </Link>
            <Link to="/legal/privacy-policy" className="reverse">
              Legal documents
            </Link>
            <div className="social-wrap d-flex align-items-center">
              <a href="https://www.facebook.com/apparatusapp" target="blank">
                <SvgRender style={{ height: 16 }} path={facebook} svgClassName="gray-svg" />
              </a>
              <a href="#" className="ml-2 mr-2" target="blank">
                <SvgRender style={{ height: 16 }} path={twitter} svgClassName="gray-svg" />
              </a>
              <a href="#" target="blank">
                <SvgRender style={{ height: 16 }} path={linkedIn} svgClassName="gray-svg" />
              </a>
            </div>
          </div>
        </footer>

        {!this.props.userAcceptedCookies && (
          <div
            id="cookies-wrapper"
            className={`cookies-wrapper legal-accept-wrapper ${
              this.props.match.url.startsWith('/legal/') ? 'legal-view' : ''
            }`}
          >
            <Row className="align-items-center no-gutters h-100">
              <Col xs="12" md="9" lg="auto">
                <div className="left-part px-4 pt-2 pt-md-0 px-md-0 text-center text-md-left">
                  Welcome to apparatus. This is a typical annoying box saying that we use cookies.
                  You probably don't care, but in case you do, here's our{' '}
                  <Link to="/legal/privacy-policy">privacy policy</Link>.
                </div>
              </Col>
              <Col xs="12" md="3" lg="">
                <div className="right-part text-center text-md-right mt-4 mb-2 mt-md-0 mb-md-0">
                  <button
                    className="btn btn-primary px-5"
                    onClick={() => {
                      this.acceptCookiesHandler();
                    }}
                  >
                    Whatever
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        )}

        {this.props.authenticated &&
          !this.props.userAcceptedTerms && (
            <AcceptTerms acceptTerms={this.props.acceptTerms} account={this.props.account} />
          )}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userAcceptedCookies: state.auth ? state.legal.cookies.accepted : false,
    userAcceptedTerms: hasUserAcceptedTerms(state),
    account: getAccount(state),
    authenticated: getAuthenticated(state)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { acceptCookies, acceptTerms }
  )(Footer)
);
