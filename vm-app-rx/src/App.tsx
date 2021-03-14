import React from 'react';
import { List } from '@material-ui/core';

import User from './components/User';
import { generateUsers } from './utils/usersUtils';

import './App.css';


function App() {
  const users = generateUsers();

  return (
    <List dense={true} className="list">
      {users.map(user => {
        return (
          <User
            key={`${user.id}`}
            id={user.id}
            sourceKey={user.key}
          />
        );
      })}
    </List>
  );
}

export default App;
