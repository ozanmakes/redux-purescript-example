import React, { Component, PropTypes } from "react";

export default class Counter extends Component {
  static propTypes = {
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired
  };

  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return (
      <p>
        Counter: {counter}
        {" "}
        <button onClick={increment}>+5</button>
        {" "}
        <button onClick={decrement}>-3 (async)</button>
      </p>
    );
  }
}
