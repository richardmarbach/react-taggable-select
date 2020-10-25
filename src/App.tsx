import React, { ReactElement } from 'react';
import './App.css';
import { TaggableSelect } from './components/TaggableSelect';

function App(): ReactElement {
  const tags = [
    {
      key: 'tag1',
      label: 'tag1',
      options: [{ key: 'something', label: 'other' }],
    },
    { key: 'a-tag', label: 'a-tag' },
  ];

  return (
    <div className="App">
      <TaggableSelect tags={tags} />
    </div>
  );
}

export default App;
