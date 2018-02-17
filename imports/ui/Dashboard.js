import React from 'react';

import PrivateHeader from './PrivateHeader';
// PrivateHeader is not enclosed because we need to get container
import NoteList from './NoteList';

export default () => {
  return (
    <div>
     <PrivateHeader title="Dashboard"/>
     <div className="wrapper">
       <NoteList/>
     </div>
    </div>
  )
};
