import React from 'react';

import PrivateHeader from './PrivateHeader';
// PrivateHeader is not enclosed because we need to get container
import NoteList from './NoteList';
import Editor from './Editor';

export default () => {
  return (
    <div>
     <PrivateHeader title="Dashboard"/>
     <div className="wrapper">
       <NoteList/>
       <Editor/>
     </div>
    </div>
  )
};
