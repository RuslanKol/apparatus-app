import React from 'react';

class AcceptTerms extends React.Component {
  render() {
    return (
      <div className="accept-terms d-flex align-items-center justify-content-between legal-accept-wrapper">
        <div className="mr-2">
          You haven't accept our terms of service{' '}
          {this.props.account && this.props.account.email ? `for ${this.props.account.email}` : ''}{' '}
        </div>
        <button
          className="btn btn-primary px-5"
          type="button"
          onClick={() => this.props.acceptTerms()}
          disabled={this.props.disabled || false}
        >
          Accept
        </button>
      </div>
    );
  }
}

export default AcceptTerms;
