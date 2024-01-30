import React, { FC, useRef, useState } from 'react';
import './css/calc.css';

const Calc: FC = () => {
  enum CalcActions {
    plus = 'plus',
    minus = 'minus',
    multiply = 'multiply',
    divide = 'divide',
  }

  const num1 = useRef<HTMLInputElement>(null);
  const num2 = useRef<HTMLInputElement>(null);
  const [ans, setAns] = useState<string>('Your Answer is:');

  function actionCalc(e: React.MouseEvent<HTMLButtonElement>): void {
    const calcCurrentAction = e.currentTarget.dataset?.calcaction;
    if (!calcCurrentAction) return alert('Что-то пошло не так');

    const num1Current = Number(num1.current?.value);
    const num2Current = Number(num2.current?.value);
    if (!num1Current) return setAns('Вы не ввели num1');
    if (!num2Current) return setAns('Вы не ввели num2');

    // if (calcCurrentAction === CalcActions.plus)
    //   setAns(String(num1Current + num2Current));
    // else if (calcCurrentAction === CalcActions.minus)
    //   setAns(String(num1Current - num2Current));
    // else if (calcCurrentAction === CalcActions.multiply)
    //   setAns(String(num1Current * num2Current));
    // else if (calcCurrentAction === CalcActions.divide)
    //   setAns(String(num1Current / num2Current));

    switch (calcCurrentAction) {
      case CalcActions.plus: // if (x === 'value1')
        setAns(String(num1Current + num2Current));
        break;
      case CalcActions.minus: // if (x === 'value1')
        setAns(String(num1Current - num2Current));
        break;
      case CalcActions.multiply: // if (x === 'value1')
        setAns(String(num1Current * num2Current));
        break;
      case CalcActions.divide: // if (x === 'value1')
        setAns(String(num1Current / num2Current));
        break;
    }
  }

  return (
    <div className="widget">
      <h1>Calculator</h1>
      <div className="calc">
        <input
          ref={num1}
          id="calc_inp_num1"
          type="number"
          placeholder="typing num1..."
        />
        <input
          ref={num2}
          id="calc_inp_num2"
          type="number"
          placeholder="typing num2..."
        />
      </div>
      <div className="operators">
        <button
          onClick={actionCalc}
          data-calcAction={CalcActions.plus}
          className="plus">
          +
        </button>
        <button
          onClick={actionCalc}
          data-calcAction={CalcActions.minus}
          className="minus">
          -
        </button>
        <button
          onClick={actionCalc}
          data-calcAction={CalcActions.multiply}
          className="multiply">
          *
        </button>
        <button
          onClick={actionCalc}
          data-calcAction={CalcActions.divide}
          className="divide">
          /
        </button>
      </div>
      <span className="answer">{ans} </span>
    </div>
  );
};

export default Calc;
