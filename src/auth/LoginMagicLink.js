import React, { Component } from 'react';
import { connect } from 'react-redux';
import SvgRender from 'components/helpers/SvgRender';

import { getToken, magicLinkLogin, magicLinkFailed } from 'auth/_actions';
import { fetchAccount } from 'views/account/_actions';
import loader from 'assets/svg/loader.svg';

class LoginMagicLink extends Component {
  componentDidMount() {
    const params = { code: this.props.match.params.token };
    if (params) {
      this.props.getToken().then(() => this.handleMagicLogin(params));
    } else {
      // If we are here, this is a bug.
      this.props.history.push('/login');
    }
  }

  async handleMagicLogin(params) {
    this.props
      .magicLinkLogin(params)
      .then(response => {
        if (response)
          if (response.success) {
            const account = this.props.fetchAccount();
            if (account.success) this.props.history.push(`/dashboard`);
          } else this.props.history.push(`/login`);
      })
      .catch(error => {});
  }

  render() {
    return (
      <div className="login-wrapper d-flex align-items-center justify-content-center">
        <SvgRender className="qrcode-loader" path={loader} style={{ height: '8rem' }} />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {
    getToken,
    magicLinkLogin,
    magicLinkFailed,
    fetchAccount
  }
)(LoginMagicLink);
