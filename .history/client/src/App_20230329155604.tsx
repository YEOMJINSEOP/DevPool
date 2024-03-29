import React, { useEffect, useState } from 'react';
import Header from './components/common/Header/Header';
import './App.css';
import { getUserById, getUsers } from './api/api';
import { Routes, Route, Link } from 'react-router-dom';
import UserInfo from './components/user/UserInfo/UserInfo';

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
      <Routes>
        <Route path='/userInfo' element={<UserInfo />} />
      </Routes>
    </>
  );
}

export default App;
