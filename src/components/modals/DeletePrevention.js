import React, { Component } from 'react';

class DeletePrevention extends Component {
  render() {
    return (
      <div className="row justify-content-center p-4">
        <div className="col-12 text-center">
          <div dangerouslySetInnerHTML={{ __html: this.props.body }} />
        </div>
        <div className="col-12 text-center mt-4">
          <button
            type="button"
            className="btn btn-danger pr-4 pl-4"
            onClick={e => this.props.action(e, this.props.item ? this.props.item : null)}
          >
            {this.props.buttonLabel ? this.props.buttonLabel : 'Delete'}
          </button>
          <button type="button" className="btn btn-remove-link ml-4" onClick={this.props.toggle}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default DeletePrevention;
