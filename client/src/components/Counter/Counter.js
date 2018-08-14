import React from 'react';

const Counter = ({ number, onIncrement, onDecrement }) => (
  <div>
    <h1>{number}</h1>
    <button type="button" onClick={onIncrement}>
      증가 (+)
    </button>
    <button type="button" onClick={onDecrement}>
      감소 (-)
    </button>
  </div>
);

Counter.defaultProps = {
  number: 0,
};

export default Counter;
