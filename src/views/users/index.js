import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  ButtonToolbar,
  ButtonGroup,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';

import SvgRender from 'components/helpers/SvgRender';

import TableInfo from 'components/helpers/TableInfo/Index.js';

import searchIcon from 'assets/svg/Search.svg';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, id) {
    this.setState(prev => ({
      activeTab: !prev.activeTab
    }));
  }

  render() {
    const userArr = [
      {
        id: 1,
        image: null,
        name: 'Addie Dixon',
        email: 'dustin@monospacelabs.com',
        location: 'GRC',
        phone: '386 - 264 - 5437',
        app: 23,
        activity: '12-27-2018, 09:07am',
        actions: true
      },
      {
        id: 2,
        image: null,
        name: 'Terry Martin',
        email: 'earl_padberg@jeanette.us',
        location: 'GRC',
        phone: '233 - 333 - 5437',
        app: 11,
        activity: '12-24-2018, 08:57pm',
        actions: false
      },
      {
        id: 3,
        image: null,
        name: 'Ralph Cross',
        email: 'grady.bauch@yahoo.com',
        location: 'GRC',
        phone: '200 - 264 - 5437',
        app: 45,
        activity: '12-28-2018, 19:07am',
        actions: true
      },
      {
        id: 4,
        image: null,
        name: 'Ralph Cross Jr.',
        email: 'gady.bauch@yahoo.com',
        location: 'GRC',
        phone: '222 - 264 - 5437',
        app: 45,
        activity: '12-28-2018, 19:07am',
        actions: true
      }
    ];

    const headTitle = [
      { type: 'name', title: 'Name' },
      { type: 'email', title: 'Email' },
      { type: 'phone', title: 'Mobile Number' },
      { type: 'app', title: 'Applications' },
      { type: 'activity', title: 'Last Activity' },
      { type: 'actions', title: 'Actions' }
    ];
    return (
      <div className="users">
        <div className="container-fluid">
          <Row className="option-row">
            <Col md={6} className="d-flex align-items-end status-control">
              <button
                onClick={e => this.handleClick(e, 1)}
                className={this.state.activeTab ? 'active button' : 'button'}
              >
                a
              </button>
              <button
                onClick={e => this.handleClick(e, 2)}
                className={this.state.activeTab ? 'active button' : 'button'}
              >
                b
              </button>
            </Col>
            <Col className="option-wrap search ">
              <InputGroup className="mb-1">
                <InputGroupAddon addonType="prepend">
                  <SvgRender path={searchIcon} />
                </InputGroupAddon>
                <Input placeholder="Find a user, integration, ..." />
              </InputGroup>
              <div className="page d-flex justify-content-center align-items-center">
                <span className="mr-3">
                  Page <span className="semibold"> 1 </span> of{' '}
                  <span className="semibold"> 22 </span>
                </span>
                <ButtonToolbar>
                  <ButtonGroup className="page-nav-btn d-flex justify-content-between">
                    <button className="icon-arrow-left" />
                    <button className="icon-arrow-right" />
                  </ButtonGroup>
                </ButtonToolbar>
              </div>
              <div className="total-item semibold">
                Total: <span>{userArr.length}</span>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md="12">
              <TableInfo className="users-table" headTitle={headTitle} tableData={userArr} />
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="d-flex justify-content-end">
              <Pagination aria-label="Page navigation example">
                <PaginationItem>
                  <PaginationLink previous href="#" className="icon-arrow-left" />
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">...</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">22</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink next href="#" className="icon-arrow-right " />
                </PaginationItem>
              </Pagination>
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
)(Users);
