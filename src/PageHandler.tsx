import React, { FC, useEffect, useState } from 'react';
import CardFlip from './components/CardFlip/CardFlip';
import { Route, Routes, useLocation } from 'react-router-dom';
import TodosInfoPage from './pages/Todo/TodosInfoPage';
import TodosPage from './pages/Todo/TodosPage';
import Calc from './pages/Calc/Calc';
import AuthPage from './pages/Auth/AuthPage';

const PageHandler = () => {
  const cardFlipAnimationDelay = 1000;

  const [cardBackContent, setCardBackContent] = useState(<TodosInfoPage />);
  const [nextAppPath, setNextAppPath] = useState<string | null>('calc');
  const [prevAppPath, setPrevAppPath] = useState<string | null>(null);
  const location = useLocation();

  async function changeCardBack() {
    const path = location.pathname;
    if (path === '/widget') {
      setCardBackContent(<TodosInfoPage />);
      setNextAppPath('calc');
      setPrevAppPath(null);
    }
    if (path === '/calc') {
      setCardBackContent(<div>Yes, im calc Back</div>);
      setNextAppPath('auth');
      setPrevAppPath('widget');
    }
    if (path === '/auth') {
      setCardBackContent(<div>Yes, im calc Back</div>);
      setNextAppPath(null);
      setPrevAppPath('calc');
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      changeCardBack();
    }, cardFlipAnimationDelay);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <CardFlip
      CardBackComponent={cardBackContent}
      nextAppPath={nextAppPath}
      prevAppPath={prevAppPath}>
      <Routes>
        <Route path="/" element={<TodosPage></TodosPage>} />
        <Route path="widget" element={<TodosPage></TodosPage>} />
        <Route path="calc" element={<Calc></Calc>} />
        <Route path="auth" element={<AuthPage></AuthPage>} />
      </Routes>
    </CardFlip>
  );
};

export default PageHandler;
