import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import MyRouter from './router/MyRouter';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <MyRouter />
    </BrowserRouter>
  );
};

export default App;
