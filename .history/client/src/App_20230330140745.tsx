import React from 'react';
import Header from './components/common/Header/Header';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import UserInfo from './components/user/UserInfo/UserInfo';
import TeamForm from './components/team/TeamForm/TeamForm';
import {
  RecoilRoot,
  useRecoilState
} from 'recoil';
import { textState } from './recoil/stack';

const App: React.FC = () => {
  const [text, setText] = useRecoilState(textState);
  return (
    <RecoilRoot>
      <Header logo="devPool" />
      <Routes>
        <Route path='/userInfo' element={<UserInfo />} />
        <Route path='/teamForm' element={<TeamForm/>} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
