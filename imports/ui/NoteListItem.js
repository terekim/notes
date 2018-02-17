import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Session} from 'meteor/session';
import moment from 'moment';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../api/notes';

export const NoteListItem = (props) => {
  return (
    <div onClick={() => {
      props.Session.set('selectedNoteId', props.note._id);
    }}>
      <h5>{props.note.title || 'Untitled'}</h5>
      <p>{ moment(props.note.updatedAt).format('M/DD/YY')}</p>
    </div>
  );
};

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return { Session }
}, NoteListItem)
