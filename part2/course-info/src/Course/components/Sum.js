import React from "react";

const Sum = ({ parts }) => {
  const totalEx = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <strong>Total of {totalEx} exercises</strong>
    </p>
  );
};

export default Sum;
