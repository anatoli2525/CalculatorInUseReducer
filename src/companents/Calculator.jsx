import React, { useReducer } from 'react';
import '../App.css';

const initialState = { display: '0', prevValue: null, operator: null };

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'NUMBER':
      return {
        ...state,
        display: state.display === '0' ? payload : state.display + payload,
      };
    case 'OPERATOR':
      return { ...state, prevValue: state.display, display: '0', operator: payload };
    case 'EQUALS':
      if (state.operator && state.prevValue) {
        const prev = parseFloat(state.prevValue);
        const current = parseFloat(state.display);
        const result = {
          '+': prev + current,
          '-': prev - current,
          '*': prev * current,
          '/': prev / current,
        }[state.operator];
        return { ...state, display: result.toString(), prevValue: null, operator: null };
      }
      return state;
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (type, payload) => () => dispatch({ type, payload });

  return (
    <div className="calculator">
      <div className="display">{state.display}</div>
      <div className="buttons">
        <button onClick={handleClick('CLEAR')}>C</button>
        <button onClick={handleClick('NUMBER', '7')}>7</button>
        <button onClick={handleClick('NUMBER', '8')}>8</button>
        <button onClick={handleClick('NUMBER', '9')}>9</button>
        <button onClick={handleClick('OPERATOR', '/')}>/</button>
        <button onClick={handleClick('NUMBER', '4')}>4</button>
        <button onClick={handleClick('NUMBER', '5')}>5</button>
        <button onClick={handleClick('NUMBER', '6')}>6</button>
        <button onClick={handleClick('OPERATOR', '*')}>*</button>
        <button onClick={handleClick('NUMBER', '1')}>1</button>
        <button onClick={handleClick('NUMBER', '2')}>2</button>
        <button onClick={handleClick('NUMBER', '3')}>3</button>
        <button onClick={handleClick('OPERATOR', '-')}>-</button>
        <button onClick={handleClick('NUMBER', '0')}>0</button>
        <button onClick={handleClick('EQUALS')}>=</button>
        <button onClick={handleClick('OPERATOR', '+')}>+</button>
      </div>
    </div>
  );
}

export default Calculator;
