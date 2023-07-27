import React from 'react'

const SearchForm = ({search, setSearch}) => {
    const handleChange = e => {
        setSearch(e.target.value);
    }

  return (
    <div>
        <span>Find countries </span>
        <input value={search} onChange={handleChange}/>
    </div>
  )
}

export default SearchForm