import React from 'react';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import UserInfo from './components/user/UserInfo/UserInfo';
import TeamForm from './components/team/TeamForm/TeamForm';

const App: React.FC = () => {
  
  return (
    <>
      <Header logo="devPool" />
      <Routes>
        <Route path='/userInfo' element={<UserInfo/>} />
        <Route path='/teamForm' element={<TeamForm/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
