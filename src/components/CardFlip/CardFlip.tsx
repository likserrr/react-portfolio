import { FC, useState } from 'react';
import './css/card.css';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

interface ICardFlip {
  children: JSX.Element;
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

  function flipCard() {
    setCardFlip(!cardFlip);
  }

  function routeNextApp() {
    if (nextAppPath) navigate(nextAppPath, { replace: false });
    flipCard();
  }

  function routePrevApp() {
    if (prevAppPath) navigate(prevAppPath, { replace: false });
    flipCard();
  }

  return (
    <div className={clsx('flip-card', { flip: cardFlip })}>
      <div className={clsx('actions-page', { flipping: cardFlip })}>
        {Boolean(prevAppPath) && (
          <button onClick={routePrevApp} className="flip-button prev-app">
            ← &nbsp;Prev App
          </button>
        )}
        {Boolean(nextAppPath) && (
          <button onClick={routeNextApp} className="flip-button next-app">
            Next App &nbsp;→
          </button>
        )}
        <button onClick={flipCard} className="flip-button">
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
