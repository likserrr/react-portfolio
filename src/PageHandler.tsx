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
  const [pageName, setPageName] = useState<InfoPages>(InfoPages.TODOS);
  const [nextAppPath, setNextAppPath] = useState<string | null>('calc');
  const [prevAppPath, setPrevAppPath] = useState<string | null>(null);
  const location = useLocation();

  function changeCardBack() {
    const path = location.pathname;

    if (allRoute.hasOwnProperty(path)) {
      setPageName(allRoute[path]);

      const routes = Object.keys(allRoute);
      const pathIndexRoute = routes.indexOf(path);
      const nextRoute = routes[pathIndexRoute + 1];
      const prevRoute = routes[pathIndexRoute - 1];
      setNextAppPath(nextRoute);
      setPrevAppPath(prevRoute);
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
      CardBackComponent={getPageComponent(pageName)}
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
