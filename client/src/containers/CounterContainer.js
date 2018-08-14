import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CounterActions } from '../store/actionCreator';
import Counter from '../components/Counter';

class CounterContainer extends Component {
  handleIncrement = () => {
    CounterActions.increment();
  };

  handleDecrement = () => {
    CounterActions.decrement();
  };

  render() {
    const { handleIncrement, handleDecrement } = this;
    const { number } = this.props;
    return (
      <Counter
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        number={number}
      />
    );
  }
}

export default connect(state => ({
  number: state.counter.number,
}))(CounterContainer);
