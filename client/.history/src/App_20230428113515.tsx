import React from 'react';
import Header from './components/common/Header/Header';
import './App.css';
import {Outlet} from 'react-router-dom';

const App: React.FC = () => {
  
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
