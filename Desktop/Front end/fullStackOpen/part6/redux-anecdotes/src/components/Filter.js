import React from "react";
import { useDispatch } from "react-redux";
import { filterAnecdote } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={(event) => dispatch(filterAnecdote(event.target.value))} />
    </div>
  );
};

export default Filter;
