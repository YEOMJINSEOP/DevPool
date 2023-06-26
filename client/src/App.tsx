import React from 'react';
import Header from './components/common/Header/Header';
import './App.css';
import {Outlet} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Outlet />
      </QueryClientProvider>
    </>
  );
}

export default App;
