import React, { useReducer } from 'react';

const initialState = {
  display: '0',
  prevValue: null,
  operator: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'NUMBER':
      return {
        ...state,
        display: state.display === '0' ? action.payload : state.display + action.payload,
      };
    case 'OPERATOR':
      return {...state, prevValue: state.display,display: '0', operator: action.payload, };
    case 'EQUALS':
      if (state.operator && state.prevValue) {
        const prev = parseFloat(state.prevValue);
        const current = parseFloat(state.display);
        let result;

        switch (state.operator) {
          case '+':
            result = prev + current;
            break;
          case '-':
            result = prev - current;
            break;
          case '*':
            result = prev * current;
            break;
          case '/':
            result = prev / current;
            break;
          default:
            return state;
        }

        return {...state,display: result.toString(),prevValue: null, operator: null,};
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

  return (
    <div className="calculator">
      <div className="display">{state.display}</div>
      <div className="buttons">
        <button onClick={() => dispatch({ type: 'CLEAR' })}>C</button>
        <button onClick={() => dispatch({ type: 'NUMBER', payload: '7' })}>7</button>
        <button onClick={() => dispatch({ type: 'NUMBER', payload: '8' })}>8</button>
        <button onClick={() => dispatch({ type: 'NUMBER', payload: '9' })}>9</button>
        <button onClick={() => dispatch({ type: 'OPERATOR', payload: '/' })}>/</button>
        <button onClick={() => dispatch({ type: 'NUMBER', payload: '4' })}>4</button>
        <button onClick={() => dispatch({ type: 'NUMBER', payload: '5' })}>5</button>
        <button onClick={() => dispatch({ type: 'NUMBER', payload: '6' })}>6</button>
        <button onClick={() => dispatch({ type: 'OPERATOR', payload: '*' })}>*</button>
        <button onClick={() => dispatch({ type: 'NUMBER', payload: '1' })}>1</button>
        <button onClick={() => dispatch({ type: 'NUMBER', payload: '2' })}>2</button>
        <button onClick={() => dispatch({ type: 'NUMBER', payload: '3' })}>3</button>
        <button onClick={() => dispatch({ type: 'OPERATOR', payload: '-' })}>-</button>
        <button onClick={() => dispatch({ type: 'NUMBER', payload: '0' })}>0</button>
        <button onClick={() => dispatch({ type: 'EQUALS' })}>=</button>
        <button onClick={() => dispatch({ type: 'OPERATOR', payload: '+' })}>+</button>
      </div>
    </div>
  );
}

export default Calculator;
