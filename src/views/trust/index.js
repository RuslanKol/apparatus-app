import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';

import SvgRender from 'components/helpers/SvgRender';

import emailConfError from 'assets/svg/EmailConfError.svg';
import emailConfSuccess from 'assets/svg/EmailConfSuccess.svg';
import loader from 'assets/svg/loader.svg';

import { checkToken } from './_actions';

class Trust extends Component {
  constructor() {
    super();

    this.state = { success: '', loading: true, already_confirmed: false };
  }

  resetLoader() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentDidMount() {
    let token = this.props.match.params.token;
    if (!token) {
      this.setState({ success: false });
      return;
    }
    let params = { code: token };
    this.props
      .checkToken(params)
      .then(response => {
        if (response.success) this.setState({ success: true });
        else {
          if (response && response.data && response.data.code === 'device_already_confirmed') {
            this.setState({ success: true, already_confirmed: true });
          } else {
            this.setState({ success: false });
          }
        }

        this.resetLoader();
      })
      .catch(error => {
        this.setState({ success: false });
        this.resetLoader();
      });
  }

  render() {
    return (
      <div className="trust-wrapper d-flex align-items-center justify-content-center">
        <div className="info-wrapper d-flex align-items-center justify-content-center flex-column">
          {this.state.loading ? (
            <SvgRender className="qrcode-loader" path={loader} style={{ height: '8rem' }} />
          ) : this.state.success ? (
            <Fragment>
              <img
                className="svg-wrap success d-none d-md-flex"
                src={emailConfSuccess}
                height="311"
              />
              <img
                className="svg-wrap success d-flex d-md-none"
                src={emailConfSuccess}
                height="265"
              />
              {this.state.already_confirmed ? (
                <h3>Your email address is already confirmed!</h3>
              ) : (
                <Fragment>
                  <h3>You have succesfully confirmed your email!</h3>
                  <p>
                    Thank you for joinning apparatus! Your email has been confirmed.<br />You can
                    now use the apparatus app to scan the QR code.
                  </p>
                </Fragment>
              )}
            </Fragment>
          ) : (
            <Fragment>
              <img className="svg-wrap error d-none d-md-flex" src={emailConfError} height="311" />
              <img className="svg-wrap error d-flex d-md-none" src={emailConfError} height="265" />
              <h3>Oh no…!</h3>
              <p>It seems that we couldn’t verify your email address.</p>
              <p>
                Please try again, or contact our support team at{' '}
                <a href="mailto:support@apparatusapp.com" className="link blue">
                  support@apparatusapp.com
                </a>.
              </p>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  checkToken
})(Trust);
