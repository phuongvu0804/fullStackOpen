import React from "react";
import { useField } from "../hooks";

const SearchForm = ({handleName}) => {
  const nameInput = useField('text')

  const fetch = (e) => {
    e.preventDefault()
    handleName(nameInput.value)
  }
  
  return (
    <form onSubmit={fetch}>
      <input {...nameInput} />
      <button>find</button>
    </form>
  );
};

export default SearchForm;
