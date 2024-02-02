import React, { FC, useEffect, useState } from 'react';
import CardFlip from './components/CardFlip/CardFlip';
import { Route, Routes, useLocation } from 'react-router-dom';
import TodosInfoPage from './pages/Todo/TodosInfoPage';
import TodosPage from './pages/Todo/TodosPage';
import Calc from './pages/Calc/CalcPage';
import AuthPage from './pages/Auth/AuthPage';
import CalcInfoPage from './pages/Calc/CalcInfoPage';

const cardFlipAnimationDelay = 1000;

enum InfoPages {
  TODOS = 'TODOS_INFO_PAGE',
  CALC = 'CALC_INFO_PAGE',
  AUTH = 'AUTH_INFO_PAGE',
}

const allRoute: { [key: string]: InfoPages } = {
  '/widget': InfoPages.TODOS,
  '/calc': InfoPages.CALC,
  '/auth': InfoPages.AUTH,
};

const PageHandler = () => {
  const [cardBackContent, setCardBackContent] = useState(() =>
    getPageComponent(InfoPages.TODOS),
  );
  const [nextAppPath, setNextAppPath] = useState<string | null>('calc');
  const [prevAppPath, setPrevAppPath] = useState<string | null>(null);
  const location = useLocation();

  function changeCardBack() {
    const path = location.pathname;

    if (allRoute.hasOwnProperty(path)) {
      setCardBackContent(() => getPageComponent(allRoute[path]));

      const keys = Object.keys(allRoute);
      const pathIndex = keys.indexOf(path);
      const nextKey = keys[pathIndex + 1];
      const prevKey = keys[pathIndex - 1];
      setNextAppPath(nextKey);
      setPrevAppPath(prevKey);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      changeCardBack();
    }, cardFlipAnimationDelay);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  function getPageComponent(infoPageType: InfoPages) {
    switch (infoPageType) {
      case InfoPages.TODOS:
        return <TodosInfoPage />;
      case InfoPages.CALC:
        return <CalcInfoPage />;
      case InfoPages.AUTH:
        return <div>Yes, im auth Back</div>;

      default:
        return <TodosInfoPage></TodosInfoPage>;
    }
  }

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
