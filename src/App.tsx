import React, { FC, useState } from 'react';
import TodosPage from './pages/Todo/TodosPage';
import Calc from './pages/Calc/Calc';
import AuthPage from './pages/Auth/AuthPage';

import './styles/css/style.css';
import CardFlip from './components/CardFlip/CardFlip';
import TodosInfoPage from './pages/Todo/TodosInfoPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App: FC = () => {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <CardFlip CardBackComponent={<TodosInfoPage />}>
          <Routes>
            <Route path="/" element={<TodosPage></TodosPage>} />
            <Route path="widget" element={<TodosPage></TodosPage>} />
            <Route path="calc" element={<Calc></Calc>} />
          </Routes>
        </CardFlip>
      </BrowserRouter>
    </div>
  );
};

export default App;
