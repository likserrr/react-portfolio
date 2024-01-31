import React, { FC, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageHandler from './PageHandler';
import './styles/css/style.css';

const App: FC = () => {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <PageHandler />
      </BrowserRouter>
    </div>
  );
};

export default App;
