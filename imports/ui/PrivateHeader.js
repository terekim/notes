import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';


export const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="wrapper wrapper--header">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--menu" onClick={() => props.handleLogout()}>logout</button>
      </div>
    </div>

  )
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default createContainer(() => {
  return {
    handleLogout: () => {
      Accounts.logout();
    }
  };
}, PrivateHeader);
