import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import './App.css';
import { getUserById, getUsers } from './api/api';

const App: React.FC = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUserById(1).then((data) => {
      // setUsers(data);
      console.log(data);
    })
  }, []);
  return (
    <>
      <Header name="KAU" />
      {/* <ul>
        {users.map((user) => (
          <li>
            {user}
          </li>
        ))}
      </ul> */}
    </>
  );
}

export default App;
