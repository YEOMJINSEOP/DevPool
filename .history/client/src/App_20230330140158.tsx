import React from 'react';
import Header from './components/common/Header/Header';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import UserInfo from './components/user/UserInfo/UserInfo';
import TeamForm from './components/team/TeamForm/TeamForm';
import {
  RecoilRoot
} from 'recoil';

const App: React.FC = () => {
  return (
    <RecoilRouter>
      <Header logo="devPool" />
      <Routes>
        <Route path='/userInfo' element={<UserInfo />} />
        <Route path='/teamForm' element={<TeamForm/>} />
      </Routes>
    </RecoilRouter>
  );
}

export default App;
