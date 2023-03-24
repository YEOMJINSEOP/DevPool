import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import './App.css';
import { getUsers } from './api/api';

const App: React.FC = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    })
  }, []);
  return (
    <>
      <Header name="KAU" />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
