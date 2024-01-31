import React, { FC, useState } from 'react';
import './css/card.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

interface ICardFlip {
  children: JSX.Element | JSX.Element[];
  CardBackComponent: JSX.Element;
  prevAppPath: string | null;
  nextAppPath: string | null;
}

const CardFlip: FC<ICardFlip> = ({
  children,
  CardBackComponent,
  prevAppPath,
  nextAppPath,
}) => {
  const navigate = useNavigate();
  const [cardFlip, setCardFlip] = useState<boolean>(false);

  return (
    <div className={cardFlip ? 'flip-card flip' : 'flip-card'}>
      <div className={cardFlip ? 'actions-page flipping' : 'actions-page'}>
        {prevAppPath ? (
          <button
            onClick={() => {
              navigate(prevAppPath, { replace: false });
              setCardFlip(!cardFlip);
            }}
            className="flip-button prev-app">
            ← &nbsp;Prev App
          </button>
        ) : (
          <></>
        )}
        {nextAppPath ? (
          <button
            onClick={() => {
              navigate(nextAppPath, { replace: false });
              setCardFlip(!cardFlip);
            }}
            className="flip-button next-app">
            Next App &nbsp;→
          </button>
        ) : (
          <></>
        )}
        <button onClick={() => setCardFlip(!cardFlip)} className="flip-button">
          Click Me!
        </button>
      </div>
      <div className="flip-card-inner">
        <div className="flip-card-front">{children}</div>

        <div className="flip-card-back">{CardBackComponent}</div>
      </div>
    </div>
  );
};

export default CardFlip;
