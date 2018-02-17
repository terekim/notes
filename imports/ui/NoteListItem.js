import React from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../api/notes';

const NoteListItem = (props) => {
  return (
    <div>
      <h5>{props.note.title || 'Untitled'}</h5>
      <p>{ moment(props.note.updatedAt).format('M/DD/YY')}</p>
    </div>
  );
};

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired
};

export default NoteListItem;
