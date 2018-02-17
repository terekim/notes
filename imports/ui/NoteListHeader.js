import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../api/notes';

//NoteListHeader
export const NoteListHeader = (props) => {
  return (
    <button onClick={()=>{props.meteorCall('notes.insert');}}>
      <div>Create Note</div>
    </button>
  );
};

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
};

//need meteorCall for test cases
export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, NoteListHeader);
