import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import SvgRender from 'components/helpers/SvgRender';
import appStore from 'assets/svg/AppStore.svg';
import googlePlay from 'assets/svg/GooglePlay.svg';

import { getMobileOperatingSystem } from 'utils/helpers/device';

class LoginMobile extends Component {
  render() {
    return (
      <div className="login-mobile-wrapper d-flex align-items-center justify-content-center">
        <Row className="justify-content-center">
          <Col xs="12">
            <Row className="justify-content-center text-center mb-4 mb-md-6">
              <h4>Download the apparatus App</h4>
            </Row>
            <Row className="justify-content-center">
              <div className="svg-container">
                {getMobileOperatingSystem(navigator) === 'iOS' && (
                  <a href="https://itunes.apple.com/us/app/apparatus-app/id1317271136?ls=1&mt=8">
                    <SvgRender path={appStore} style={{ height: '3.5rem' }} />
                  </a>
                )}
                {getMobileOperatingSystem(navigator) === 'Android' && (
                  <a href="https://play.google.com/store/apps/details?id=com.apparatusapp">
                    <SvgRender path={googlePlay} style={{ height: '3.5rem' }} />
                  </a>
                )}
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LoginMobile;
