import React, { useState } from "react";

const Filter = ({ searchValue, setSearchValue }) => {
  const [input, setInput] = useState("")
  const handleSearchedValue = (e) => {
    setInput(e.target.value)
    setSearchValue(e.target.value.toLowerCase());
  };
  
  return (
    <div>
      <span>Filter shown with </span>
      <input value={input} onChange={handleSearchedValue} />
    </div>
  );
};

export default Filter;
