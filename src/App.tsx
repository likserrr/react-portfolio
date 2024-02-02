import React, { FC, useState } from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import PageHandler from './PageHandler';
import './styles/css/style.css';

const App: FC = () => {
  return (
    <div className="wrapper">
      <HashRouter>
        <PageHandler />
      </HashRouter>
    </div>
  );
};

export default App;
