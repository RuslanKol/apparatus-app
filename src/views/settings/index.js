import React, { Component } from 'react';
import { withRouter, NavLink, Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAccount } from 'views/account/_actions';

import SvgRender from 'components/helpers/SvgRender';
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardFooter,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  ButtonToolbar,
  ButtonGroup,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
class Profile extends Component {
  render() {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <div className="container-fluid " />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  { fetchAccount }
)(Profile);
