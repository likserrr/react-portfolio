import React, { FC, useRef, useState } from 'react';
import './css/calc.css';

enum CalcActions {
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  MULTIPLY = 'MULTIPLY',
  DIVIDE = 'DIVIDE',
}

const CalcPage: FC = () => {
  const num1 = useRef<HTMLInputElement>(null);
  const num2 = useRef<HTMLInputElement>(null);
  const [ans, setAns] = useState<string>('Your Answer is:');
  const [calcAction, setCalcAction] = useState<CalcActions>();

  const calcHandler = () => {
    const calcCurrentAction = calcAction;

    const num1Current = Number(num1.current?.value);
    const num2Current = Number(num2.current?.value);
    if (!num1Current) return setAns('Вы не ввели num1');
    if (!num2Current) return setAns('Вы не ввели num2');

    switch (calcCurrentAction) {
      case CalcActions.PLUS:
        setAns(String(num1Current + num2Current));
        break;
      case CalcActions.MINUS:
        setAns(String(num1Current - num2Current));
        break;
      case CalcActions.MULTIPLY:
        setAns(String(num1Current * num2Current));
        break;
      case CalcActions.DIVIDE:
        setAns(String(num1Current / num2Current));
        break;
    }
  };

  const actionHandler = (action: CalcActions) => {
    setCalcAction(action);
    calcHandler();
  };

  return (
    <div className="widget">
      <h1>Calculator</h1>
      <div className="calc">
        <input ref={num1} type="number" placeholder="typing num1..." />
        <input ref={num2} type="number" placeholder="typing num2..." />
      </div>
      <div className="operators">
        <button
          onClick={() => actionHandler(CalcActions.PLUS)}
          className="plus">
          +
        </button>
        <button
          onClick={() => actionHandler(CalcActions.MINUS)}
          className="minus">
          -
        </button>
        <button
          onClick={() => actionHandler(CalcActions.MULTIPLY)}
          className="multipy">
          *
        </button>
        <button
          onClick={() => actionHandler(CalcActions.DIVIDE)}
          className="divide">
          /
        </button>
      </div>
      <span className="answer">{ans}</span>
    </div>
  );
};

export default CalcPage;
