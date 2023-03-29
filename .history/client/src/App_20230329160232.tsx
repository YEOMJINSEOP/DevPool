import React, { useEffect, useState } from 'react';
import Header from './components/common/Header/Header';
import './App.css';
import { getUserById, getUsers } from './api/api';
import { Routes, Route, Link } from 'react-router-dom';
import UserInfo from './components/user/UserInfo/UserInfo';
import TeamForm from './components/team/TeamForm/TeamForm';

const App: React.FC = () => {
  return (
    <>
      <Header logo="devPool" />
      <TeamForm name="태우" mark="!!"/>
      <Routes>
        <Route path='/userInfo' element={<UserInfo />} />
      </Routes>
    </>
  );
}

export default App;
