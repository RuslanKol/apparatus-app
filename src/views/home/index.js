import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import SvgRender from 'components/helpers/SvgRender';
import appStore from 'assets/svg/AppStore.svg';
import googlePlay from 'assets/svg/GooglePlay.svg';
import smartphoneHand from 'assets/svg/smartphoneHand.svg';

import animation from 'assets/img/animation.gif';

import { checkIfDevice, getMobileOperatingSystem } from 'utils/helpers/device';

class Home extends Component {
  render() {
    return (
      <Row className="home-wrapper align-items-center">
        <Col
          xs="12"
          xl="5"
          className="left-side d-flex align-items-center justify-content-md-center justify-content-xl-start"
        >
          <div className="text-wrapper">
            <h1>
              Passwords <wbr />
              no more
            </h1>
            <p className="m-0">
              Apparatus can confirm your identity in websites integrated with it by using your
              trusted devices or emails instead of passwords.
            </p>
            <div className="svg-container mt-3">
              {(!checkIfDevice(navigator) || getMobileOperatingSystem(navigator) === 'iOS') && (
                <a href="https://itunes.apple.com/us/app/apparatus-app/id1317271136?ls=1&mt=8">
                  <SvgRender path={appStore} style={{ height: '3.5rem' }} />
                </a>
              )}
              {(!checkIfDevice(navigator) || getMobileOperatingSystem(navigator) === 'Android') && (
                <a href="https://play.google.com/store/apps/details?id=com.apparatusapp">
                  <SvgRender path={googlePlay} style={{ height: '3.5rem' }} />
                </a>
              )}
            </div>
          </div>
        </Col>
        <Col
          xs="12"
          xl="7"
          className="right-side mt-1 mt-md-4 mt-xl-0 d-flex align-items-center justify-content-center"
        >
          <div className="oval-wrapper p-relative">
            <div className="oval-2 d-none d-md-block" />
            <div className="img-container d-flex align-items-center justify-content-center pt-0 pt-md-12">
              <img src={animation} height={508} className="d-none d-xl-block" />
              <img src={animation} height="351" className="d-none d-md-block d-xl-none" />
              <img src={smartphoneHand} height="226" className="d-block d-md-none" />
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Home;
