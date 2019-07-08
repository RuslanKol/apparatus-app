import React from 'react';

import SvgRender from 'components/helpers/SvgRender';
import { Table } from 'reactstrap';
import compareArray from 'utils/helpers/compareArray/Index';
import Flag from 'react-world-flags';

import letterIcon from 'assets/svg/Email.svg';
import logoIdentityChannel from 'assets/svg/Identity Channels.svg';
import avatarImgDefault from 'assets/svg/Default profile image_avatar.svg';

//this.compareBy.bind(this);
// this.sortBy.bind(this);
//sortAscending: true
// compareBy(key) {
//   return function(a, b) {
//     if (a[key] < b[key]) return -1;
//     if (a[key] > b[key]) return 1;
//     return 0;
//   };
// }

// sortBy(key) {
//   let arrayCopy = [...this.state.tableData];
//   arrayCopy.sort(this.compareBy(key));
//   compareArray(arrayCopy, this.state.tableData) ? arrayCopy.reverse() : null;
//   this.setState({ tableData: arrayCopy });
// }

export default function TableInfo(props) {
  const { headTitle, tableData, className, tableType } = props;

  return (
    <Table responsive className={`info-table ${className}`}>
      <thead>
        <tr>
          {headTitle.map((i, index) => (
            <th key={index} onClick={() => this.sortBy(i.type)}>
              {i.title}
              <span className="double-caret" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map(i => (
          <tr
            key={i._id ? i._id : i.id}
            className={tableType !== 'channels' ? (!i.actions ? 'disabled' : null) : null}
          >
            {tableType === 'channels' ? (
              <th className="pl-3">{i.integration.name}</th>
            ) : (
              <th className="d-flex align-items-center flex-wrap pl-4">
                <span className="avatar-img mr-1">
                  {i.image ? (
                    <img src={i.image} alt="user" />
                  ) : (
                    <SvgRender path={avatarImgDefault} />
                  )}
                </span>
                <span> {i.name}</span>
              </th>
            )}

            <th>
              {tableType === 'channels' ? (
                <SvgRender
                  className="justify-content-start"
                  path={i.code.metadata.email ? letterIcon : logoIdentityChannel}
                  style={{ width: '25px' }}
                />
              ) : (
                i.email
              )}
            </th>
            <th>
              {tableType === 'channels' ? (
                i.directive_type.charAt(0).toUpperCase() + i.directive_type.slice(1)
              ) : (
                <React.Fragment>
                  <span className="flags-img">
                    <Flag code={i.location} />
                  </span>
                  <span>{i.phone}</span>
                </React.Fragment>
              )}
            </th>
            <th>{tableType === 'channels' ? i.code.code_type : i.app}</th>
            {tableType === 'channels' ? (
              <th>{i.code.metadata.client.languages[0].region}</th>
            ) : null}

            <th>{tableType === 'channels' ? i.created_at : i.activity}</th>
            {tableType === 'channels' ? (
              <th>
                {!i.actions ? (
                  <button className="button logout ">Log out</button>
                ) : (
                  <React.Fragment>
                    <button className="button logged-out " disabled>
                      Logged out
                    </button>
                    <button className="button-circle">i</button>
                  </React.Fragment>
                )}
              </th>
            ) : (
              <th>
                {i.actions ? (
                  <button className="button activate">Activate</button>
                ) : (
                  <button className="button deactivate">Deactivate</button>
                )}
              </th>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
