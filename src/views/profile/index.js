import React, { Component } from 'react';
import { connect } from 'react-redux';

import SvgRender from 'components/helpers/SvgRender';
import { Row, Col, Card, InputGroup, InputGroupAddon, Input, Label } from 'reactstrap';

import avatarImgDefault from 'assets/svg/Default profile image_avatar.svg';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {
        img: null
      }
    };
  }

  render() {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <div className="container-fluid ">
          <Row>
            <Col>
              <Card className="profile p-3">
                <Row>
                  <Col lg={4} className="mb-3">
                    <div className="profile-avatar">
                      {this.state.profile.img ? (
                        <img src={this.state.profile.img} className="img-fluid" alt="avatar" />
                      ) : (
                        <SvgRender path={avatarImgDefault} />
                      )}
                      <button className="button-edit-avatar">
                        {!this.state.profile.img ? (
                          <span className="edit-icon" />
                        ) : (
                          <span className="times-icon" />
                        )}

                        {/* <SvgRender path={btnEditIcon} /> */}
                      </button>
                    </div>
                  </Col>
                  <Col lg={8}>
                    <InputGroup size="lg">
                      <Label>Name</Label>
                      <Input />
                      <InputGroupAddon addonType="append">
                        <span className="edit-icon" />
                      </InputGroupAddon>
                    </InputGroup>
                    <InputGroup size="lg">
                      <Label>Email</Label>
                      <Input />
                      <InputGroupAddon addonType="append">
                        <span className="edit-icon" />
                      </InputGroupAddon>
                    </InputGroup>
                    <InputGroup className="mb-4" size="lg">
                      <Label>Phone Number</Label>
                      <Input />
                      <InputGroupAddon addonType="append">
                        <span className="edit-icon" />
                      </InputGroupAddon>
                    </InputGroup>
                    <div className="d-flex justify-content-end mb-1">
                      <button className="button-form cancel mr-2">Cancel</button>
                      <button className="button-form save ">Save</button>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {}
)(Profile);
