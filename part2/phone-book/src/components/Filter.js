import React from "react";

const Filter = ({ searchValue, setSearchValue }) => {
  const handleSearchedValue = (e) => {
    const searchedInput = e.target.value.toLowerCase();
    setSearchValue(searchedInput);
  };
  
  return (
    <div>
      <span>Filter shown with </span>
      <input value={searchValue} onChange={handleSearchedValue} />
    </div>
  );
};

export default Filter;
