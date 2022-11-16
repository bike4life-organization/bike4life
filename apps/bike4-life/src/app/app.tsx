import React from 'react';
import MainLayaout from './layout/MainLayaout';
import AppRouter from './router/AppRouter';
import './styles/app.scss';

export const App = () => {
  return (
    <MainLayaout>
      <AppRouter />
    </MainLayaout>
  );
};

export default App;
