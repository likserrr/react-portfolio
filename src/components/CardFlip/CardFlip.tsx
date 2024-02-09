import { FC, useRef, useState } from 'react';
import './css/card.css';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

interface ICardFlip {
  children: JSX.Element;
  cardBackContent: JSX.Element;
  prevAppPath: string | null;
  nextAppPath: string | null;

  cardFlipAnimationDelay?: number;
}

const CardFlip: FC<ICardFlip> = ({
  children,
  cardBackContent,
  prevAppPath,
  nextAppPath,

  cardFlipAnimationDelay = 800,
}) => {
  const navigate = useNavigate();
  const [cardFlip, setCardFlip] = useState<boolean>(false);
  const flipButton = useRef<HTMLButtonElement>(null);

  console.log('render CardFlip');

  function flipCard() {
    if (flipButton.current) flipButton.current.disabled = true;

    setCardFlip((prev) => !prev);

    setTimeout(() => {
      if (flipButton.current) flipButton.current.disabled = false;
    }, cardFlipAnimationDelay);
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
        <button onClick={flipCard} className="flip-button" ref={flipButton}>
          Click Me!
        </button>
      </div>
      <div
        style={{ transition: `transform ${cardFlipAnimationDelay}ms` }}
        className="flip-card-inner">
        <div className="flip-card-front">{children}</div>

        <div className="flip-card-back">{cardBackContent}</div>
      </div>
    </div>
  );
};

export default CardFlip;
