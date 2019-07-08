import React from 'react';

import SvgRender from 'components/helpers/SvgRender';
import searchIcon from 'assets/svg/Search.svg';

import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

export default function Search(props) {
  return (
    <InputGroup className="mb-1">
      <InputGroupAddon addonType="prepend">
        <SvgRender path={searchIcon} />
      </InputGroupAddon>
      <Input
        onChange={props.handleChangeSearch}
        value={props.search}
        placeholder="Find a user, integration, ..."
      />
    </InputGroup>
  );
}
