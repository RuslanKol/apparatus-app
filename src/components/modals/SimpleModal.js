import React, { Component } from 'react';
import { Modal, ModalHeader } from 'reactstrap';

class SimpleModal extends Component {
  render() {
    return (
      <Modal
        modalClassName={`${
          this.props.modalClassName && this.props.modalClassName !== undefined
            ? this.props.modalClassName
            : ''
        }`}
        isOpen={this.props.modalOpen}
        toggle={this.props.toggle}
        className={
          this.props.className && this.props.className !== undefined ? this.props.className : ''
        }
        id="modal-root"
      >
        {this.props.header && (
          <ModalHeader toggle={this.props.toggle}>{this.props.header}</ModalHeader>
        )}

        {this.props.body}
      </Modal>
    );
  }
}

export default SimpleModal;
