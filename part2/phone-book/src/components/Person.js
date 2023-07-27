import React from "react";
import phonebookService from "../services/phonebookService";

const Person = ({ data, persons, setPersons }) => {
  const handleDelete = () => {

    if (window.confirm(`Delete ${data.name}`)) {
      phonebookService.deletePerson(data.id);
  
      const newPersons = persons.filter(person => person.id !== data.id)
      setPersons(newPersons)

    }
  };

  return (
    <li style={{ marginBottom: "10px" }} key={data.name}>
      <span>
        {data.name} {data.number}
      </span>
      <button style={{ marginLeft: "10px" }} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default Person;
