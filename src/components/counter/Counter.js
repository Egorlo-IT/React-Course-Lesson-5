import { Container } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Counter.css";

export default React.memo(function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  return (
    <Container className="counter">
      <div className="counter-wrap">
        <p className="counter-text">Counter total: </p>
        <span className="counter-total">{count}</span>
      </div>
      <div className="button-group">
        <button
          onClick={() => dispatch({ type: "increment" })}
          className="btn button-counter"
        >
          +
        </button>
        <button
          onClick={() => dispatch({ type: "decrement" })}
          className="btn button-counter"
        >
          -
        </button>
        <button
          onClick={() => dispatch({ type: "clear" })}
          className="btn button-clear"
        >
          Clear
        </button>
      </div>
    </Container>
  );
});
