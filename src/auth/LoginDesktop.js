import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import QRCode from 'utils/helpers/qrcode';
import SvgRender from 'components/helpers/SvgRender';

import appStore from 'assets/svg/AppStore.svg';
import googlePlay from 'assets/svg/GooglePlay.svg';
import smartphoneApp from 'assets/svg/SmartphoneApp.svg';
import smartphoneQrCode from 'assets/svg/SmartphoneQrCode.svg';
import loader from 'assets/svg/loader.svg';

import { sendMagicLink, getToken, login } from 'auth/_actions';
import { getAuthenticated } from 'auth/_reducers';
import { fetchAccount } from 'views/account/_actions';

import Apparatus from 'utils/helpers/apparatus';
import { checkIfDevice } from 'utils/helpers/device';
import { registerUser } from './_actions';

let client = {
  type: 'integration',
  token: null
};

class LoginDesktop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '', // user email value
      flow: 'login', // is user logging in or registering?
      accepted: false, // registering user's terms acceptance
      isDisabled: false,
      loading: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (checkIfDevice(navigator)) {
      return;
    }

    this.props
      .getToken()
      .then(token => {
        if (token) {
          client.token = token;
          client.email_url = process.env.APPARATUS_EMAIL_URL;

          this.apparatus = new Apparatus(client);

          this.apparatus.connect();

          const qrCode = new QRCode('qrcode', {
            width: 293,
            height: 293
          });

          this.apparatus.on('update_qr_code', qrData => {
            qrCode.makeCode(qrData.code);
          });

          this.apparatus.on('login', ({ ...others }) => {
            this.handleInitialization({ ...others });
          });

          setTimeout(() => {
            this.setState({ loading: false });
          }, 200);
        }
      })
      .catch(error => {});
  }

  componentWillUnmount() {
    if (checkIfDevice(navigator)) {
      return;
    }
    if (this.apparatus) {
      this.apparatus.disconnect();
    }
  }

  handleInitialization(params) {
    const response = this.props.login(params);

    if (response.success) {
      const account = this.props.fetchAccount();
      if (account.success) this.props.history.push(`/dashboard`);
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });

    if (this.state.flow !== 'login') this.setState({ flow: 'login' });
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      email: this.state.value
    };

    this.setState({ isDisabled: true });

    if (this.state.flow === 'login')
      this.props
        .sendMagicLink(data)
        .then(() => this.setState({ value: '', isDisabled: false }))
        .catch(error => {
          error.code === 'user_not_found' && this.setState({ flow: 'register', accepted: false });
          this.setState({ isDisabled: false });
        });
    else
      this.props
        .registerUser(data)
        .then(() => this.setState({ flow: 'login', value: '', isDisabled: false }))
        .catch(() => this.setState({ isDisabled: false }));
  }

  render() {
    return (
      <div className="login-wrapper d-flex align-items-center">
        <Row className="h-100 w-100">
          <Col lg={{ offset: 1, size: '' }} className="left-side d-flex align-items-center">
            <div className="info-wrapper">
              <div className="top-half">
                <div className="qr-wrapper">
                  <div className="qrcode-inner">
                    <div id="qrcode" className={this.state.loading ? 'd-none' : ''} />
                    {this.state.loading && (
                      <SvgRender
                        className="qrcode-loader"
                        path={loader}
                        style={{ height: '6rem' }}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <div className="step d-flex align-items-center">
                    <h4>1</h4>
                    <SvgRender path={smartphoneApp} style={{ height: '8.25rem' }} />
                    <div>Open Apparatus in your smart phone.</div>
                  </div>
                  <div className="step d-flex align-items-center">
                    <h4>2</h4>
                    <SvgRender path={smartphoneQrCode} style={{ height: '8.25rem' }} />
                    <div>Point the camera at the QRcode to scan.</div>
                  </div>
                </div>
              </div>
              <div className="bottom-half">
                <div className="font-weight-normal">Don't have apparatus yet?</div>
                <div className="svg-container">
                  <a
                    href="https://itunes.apple.com/us/app/apparatus-app/id1317271136?ls=1&mt=8"
                    target="_blank"
                  >
                    <SvgRender path={appStore} style={{ height: '3.5rem' }} />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.apparatusapp"
                    target="_blank"
                  >
                    <SvgRender path={googlePlay} style={{ height: '3.5rem' }} />
                  </a>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={{ size: '' }} className="right-side mt-6 d-flex align-items-center">
            <div className="form-wrapper w-75">
              <form onSubmit={this.handleSubmit}>
                <div className="mb-2">
                  If you forgot your smartphone, enter your email & click the button to Log in or
                  Sign up.
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    value={this.state.value}
                    onChange={this.handleChange}
                    required
                  />
                  <button
                    id="submitBtn"
                    className="btn btn-primary px-4"
                    type="submit"
                    disabled={
                      this.state.isDisabled ||
                      this.state.value === '' ||
                      (this.state.flow === 'register' && !this.state.accepted)
                    }
                  >
                    {this.state.flow === 'login' ? 'Send Link' : 'Sign Up'}
                  </button>
                </div>
                {this.state.flow === 'register' && (
                  <div className="form-group pt-4">
                    <div className="checkbox-wrapper">
                      <input
                        id={'acceptTerms'}
                        type="checkbox"
                        className="checkbox"
                        value={this.state.accepted}
                        onChange={() => this.setState({ accepted: !this.state.accepted })}
                        required
                      />
                      <label htmlFor="acceptTerms">
                        <p className="terms-checkbox-label mb-0">
                          New Account? By sending a magic link to your email, you agree to the{' '}
                          <br />
                          <Link to={'/legal/terms-of-service'} className="link green">
                            Terms and conditions
                          </Link>{' '}
                          and{' '}
                          <Link to={'/legal/privacy-policy'} className="link green">
                            Privacy policy
                          </Link>.
                        </p>
                      </label>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: getAuthenticated(state)
});

export default connect(mapStateToProps, {
  registerUser,
  sendMagicLink,
  getToken,
  login,
  fetchAccount
})(LoginDesktop);
