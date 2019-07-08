import React from 'react';
import { connect } from 'react-redux';

import Home from 'views/home';
import Terms from './tabs/Terms';
import AcceptTerms from './AcceptTerms';
import SimpleModal from 'components/modals/SimpleModal';

import { getAuthenticated } from 'auth/_reducers';
import { logoutUser } from 'auth/_actions';
import { getToken } from 'auth/_actions';
import { fetchAccount } from 'views/account/_actions';
import { directTerms, acceptTerms } from './_actions';
import { setTempToken } from 'utils/api';

class LegalMagicLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      submitting: false,
      account: {}
    };
  }

  _getTempJWT = async () => {
    const { code } = this.props.match.params;
    const token = await this.props.getToken();

    if (token) {
      this.props.directTerms(code).then(data => {
        if (data && data.email) {
          this.setState({ modalOpen: true, account: data });
        } else {
          this.setState({ modalOpen: false });
        }
      });
    }
  };

  acceptTerms() {
    this.setState({ submitting: true });

    this.props.acceptTerms({ code: this.props.match.params.code }).then(data => {
      if (data) {
        this.setState(
          {
            modalOpen: false
          },
          () => setTimeout(() => this.props.history.push('/'), 500)
        );
      }
    });
  }

  componentDidMount() {
    this._getTempJWT();
  }

  componentWillUnmount() {
    setTempToken(null);
  }

  render() {
    const { ...passedProps } = this.props;

    return (
      <div>
        <Home {...passedProps} />

        <SimpleModal
          header={false}
          body={
            <div className="modal-body">
              <div className="legal-wrapper">
                <div className="tab-content">
                  <div className="tab-pane active">
                    <Terms />
                  </div>
                </div>

                <AcceptTerms
                  account={this.state.account}
                  acceptTerms={this.acceptTerms.bind(this)}
                  disabled={this.state.submitting}
                />
              </div>
            </div>
          }
          modalOpen={this.state.modalOpen}
          toggle={() => false}
          className="modal-lg"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: getAuthenticated(state)
  };
}

export default connect(mapStateToProps, {
  getToken,
  directTerms,
  acceptTerms,
  logoutUser,
  fetchAccount
})(LegalMagicLink);
