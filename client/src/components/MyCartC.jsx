import React, { useState } from "react";

const MyCartC = ({ initialQuantity }) => {
  const [count, setCount] = useState(initialQuantity);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
    
  };

  const decrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  };

  return (
    <div className="App">
      <div className="button-container">
        <button className="square-button" onClick={decrement}>
          -
        </button>
        <h1 className="counter">{count}</h1>
        <button className="square-button" onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
};

export default MyCartC;
