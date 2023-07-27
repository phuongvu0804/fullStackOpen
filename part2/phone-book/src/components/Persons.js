import React from 'react'
import Person from './Person';

const Persons = ({persons, setPersons, searchValue}) => {
  const handleFilterList = () => {
    const filteredPersons = [...persons].filter((person) =>
      person.name.toLowerCase().includes(searchValue)
    );

    return filteredPersons.map((person) => (
      <Person key={person.id} data={person} persons={persons} setPersons={setPersons}/>
    ));
  };

  return (
    <ul>{handleFilterList()}</ul>
  )
}

export default Persons