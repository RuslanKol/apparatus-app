import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from './_actions';
import { fetchUserActivity } from '../dashboard/_actions';

import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  ButtonToolbar,
  ButtonGroup
} from 'reactstrap';
import SvgRender from 'components/helpers/SvgRender';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';

import Select from 'react-select';
import TableInfo from 'components/helpers/TableInfo/Index.js';
import PaginationCustom from 'components/helpers/PaginationCustom/Index.js';
import Search from 'components/helpers/Search/Index.js';

import letterIcon from 'assets/svg/Email.svg';
import logoIdentityChannel from 'assets/svg/Identity Channels.svg';
import settingsIcon from 'assets/svg/Settings.svg';
import calendarIcon from 'assets/svg/Calendar.svg';
import appIcon from 'assets/svg/Select Application icon.svg';
import loaderIcon from 'assets/svg/loader.svg';

class Channels extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.changeSelectHandler = this.changeSelectHandler.bind(this);

    this.state = {
      dropdownOpenCalendar: false,
      dropdownOpenApp: false,
      selectedOption: null,
      search: ''
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  dateRangeHandler = (event, picker) => {
    //console.log(picker.startDate, picker.endDate);
  };

  changeSelectHandler = selectedOption => {
    this.setState = {
      selectedOption
    };
  };

  searchChangeHandler = event => {
    let searchData = this.state.search;
    this.setState({
      search: event.target.value
    });
    this.props.getFetchUserActivity({
      search: searchData.length > 1 ? searchData : this.props.getFetchUserActivity()
    });
  };

  clickHandlePagination = (currentPage, pageId, totalPages) => {
    let value = pageId;
    if (value === 'prev') {
      value = +currentPage - 1;
      if (value < 1) return false;
    } else if (value === 'next') {
      value = +currentPage + 1;
      if (value > totalPages) return false;
    } else {
      value;
    }
    this.props.getFetchUserActivity({ page: value });
  };

  render() {
    const emails = this.props.channels.emails;
    const devices = this.props.channels.devices;
    const userActivity = this.props.activity;
    const userActivityData = this.props.activity.data;
    const totalPages = this.props.activity.total_pages;
    const currentPage = this.props.activity.page;
    const { selectedOption } = this.state;
    let userActivityDataSelect;
    !userActivityData
      ? null
      : (userActivityDataSelect = Array.from(
          new Set(userActivityData.map(i => i.integration.id))
        ).map(id => {
          return {
            value: id,
            label: userActivityData.find(n => n.integration.id === id).integration.name
          };
        }));

    const loaderActivity = this.props.activity.loading;
    const loaderChannels = this.props.channels.loading;

    const nowDate = new Date();

    console.log(nowDate);

    const lastDate = dateVisit => {
      new Intl.DateTimeFormat('en-US').format(dateVisit);
    };

    const headTitle = [
      { type: 'app', title: 'Application' },
      { type: 'channel', title: 'Channel' },
      { type: 'directive', title: 'Directive' },
      { type: 'mode', title: 'Mode' },
      { type: 'location', title: 'Location' },
      { type: 'activity', title: 'Time Stamp' },
      { type: 'actions', title: 'Actions' }
    ];

    if (loaderActivity && loaderChannels) {
      return <SvgRender className="page-loader" path={loaderIcon} />;
    }

    return (
      <div className="channels">
        <div className="container-fluid">
          <Row className="channel-row">
            {emails.map(i => (
              <Col key={i._id} className="channel">
                <Card>
                  <CardHeader>
                    <Dropdown
                      className="settings-dropdown"
                      isOpen={this.state.dropdownOpen}
                      toggle={this.toggle}
                    >
                      <DropdownToggle
                        tag="span"
                        onClick={this.toggle}
                        data-toggle="dropdown"
                        aria-expanded={this.state.dropdownOpen}
                      >
                        <SvgRender path={settingsIcon} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={this.toggle}>Forget email</DropdownItem>
                        <DropdownItem onClick={this.toggle}>Rename</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </CardHeader>
                  <CardBody>
                    <div className="card-icon">
                      <SvgRender
                        path={letterIcon}
                        style={{ height: '30px', width: '47px', verticalAlign: 'middle' }}
                      />
                    </div>
                    <CardTitle>{i.payload}</CardTitle>
                    <CardText>Last used: {}</CardText>
                  </CardBody>
                  <CardFooter>
                    {i.verified ? (
                      <CardText>Verified</CardText>
                    ) : (
                      <CardText className="deactivated">Unverified</CardText>
                    )}
                    <CardText>Default</CardText>
                  </CardFooter>
                </Card>
              </Col>
            ))}
            {devices.map(i => (
              <Col key={i.id} className="channel">
                <Card>
                  <CardHeader>
                    <Dropdown
                      className="settings-dropdown"
                      isOpen={this.state.dropdownOpen}
                      toggle={this.toggle}
                    >
                      <DropdownToggle
                        tag="span"
                        onClick={this.toggle}
                        data-toggle="dropdown"
                        aria-expanded={this.state.dropdownOpen}
                      >
                        <SvgRender path={settingsIcon} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={this.toggleDevice}>Untrust device</DropdownItem>
                        <DropdownItem onClick={this.toggleDevice}>Rename</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </CardHeader>
                  <CardBody>
                    <div className="card-icon">
                      <SvgRender
                        path={logoIdentityChannel}
                        style={{ height: '29px', width: '38px', verticalAlign: 'middle' }}
                      />
                    </div>
                    <CardTitle>{i.name}</CardTitle>
                    <CardText>Last used: {i ? null : 'Never'}</CardText>
                  </CardBody>
                  <CardFooter className="center">
                    {i ? (
                      <CardText>Trusted</CardText>
                    ) : (
                      <CardText className="deactivated">Untrusted</CardText>
                    )}
                  </CardFooter>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="option-row">
            <Col className="d-flex justify-content-between">
              <Row className="full-width">
                <Col className="option-wrap ">
                  <div className="option ">
                    <DateRangePicker
                      onEvent={this.dateRangeHandler}
                      containerClass="react-bootstrap-daterangepicker-container carret"
                      containerStyles={{ display: 'flex' }}
                      ranges={{
                        Today: [moment(), moment()],
                        Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [
                          moment()
                            .subtract(1, 'month')
                            .startOf('month'),
                          moment()
                            .subtract(1, 'month')
                            .endOf('month')
                        ]
                      }}
                      alwaysShowCalendars={true}
                      format="YYYY-MM-DD hh:mm"
                      showDropdowns
                    >
                      <SvgRender
                        path={calendarIcon}
                        style={{ height: '21px', width: '22px', verticalAlign: 'middle' }}
                      />
                      <button className="option-btn">Select Dates</button>
                    </DateRangePicker>
                  </div>
                </Col>
                <Col className="option-wrap">
                  <div className="option">
                    <SvgRender
                      path={appIcon}
                      style={{ height: '21px', width: '22px', verticalAlign: 'middle' }}
                    />

                    <Select
                      isMulti
                      options={userActivityDataSelect}
                      value={selectedOption}
                      onChange={this.changeSelectHandler}
                      className={'option-item reselect'}
                      classNamePrefix={'reselect'}
                      placeholder={'Search Application(s)'}
                      closeMenuOnSelect={false}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col className="option-wrap search ">
              <Search search={this.state.search} handleChangeSearch={this.searchChangeHandler} />
              <div className="page d-flex justify-content-center align-items-center">
                <span className="mr-3 page-view">
                  Page <span className="semibold"> {currentPage}</span> of{' '}
                  <span className="semibold"> {totalPages} </span>
                </span>
                <ButtonToolbar>
                  <ButtonGroup className="page-nav-btn d-flex justify-content-between">
                    <button
                      className="icon-arrow-left"
                      onClick={this.clickHandlePagination.bind(
                        this,
                        currentPage,
                        'prev',
                        totalPages
                      )}
                    />
                    <button
                      className="icon-arrow-right"
                      onClick={this.clickHandlePagination.bind(
                        this,
                        currentPage,
                        'next',
                        totalPages
                      )}
                    />
                  </ButtonGroup>
                </ButtonToolbar>
              </div>
              <div className="total-item semibold">
                Total: <span>{userActivity.total}</span>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              {userActivity.data ? (
                <TableInfo
                  tableType="channels"
                  className="channel-table"
                  headTitle={headTitle}
                  tableData={userActivityData}
                />
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="d-flex justify-content-end">
              <PaginationCustom
                handleClickPagination={this.clickHandlePagination}
                page={currentPage}
                totalPages={totalPages}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  channels: state.channels,
  activity: state.activity
});

const mapDispatchToProps = dispatch => ({
  componentDidMount: (dispatch(fetchChannels()), dispatch(fetchUserActivity())),
  getFetchUserActivity: pageId => dispatch(fetchUserActivity(pageId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
