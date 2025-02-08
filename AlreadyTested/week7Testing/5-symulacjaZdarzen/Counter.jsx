import { useState } from "react";

const VALUES = {
  MIN: 0,
  MAX: 10,
};

export function Counter({ initialValue = 0 }) {
  const [count, setCount] = useState(validateInitialValue(initialValue));

  const increment = () => {
    if (count < VALUES.MAX) {
      setCount((prev) => ++prev);
    }
  };

  const decrement = () => {
    if (count > VALUES.MIN) {
      setCount((prev) => --prev);
    }
  };

  const reset = () => setCount(0);

  return (
    <div>
      <button
        onClick={decrement}
        disabled={count === VALUES.MIN}
      >
        -
      </button>
      <span data-testid="counter">{count}</span>
      <button
        onClick={increment}
        disabled={count === VALUES.MAX}
      >
        +
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

function validateInitialValue(value) {
  switch (true) {
    case value > VALUES.MAX:
      return VALUES.MAX;
    case value < VALUES.MIN:
      return VALUES.MIN;
    default:
      return value;
  }
}
