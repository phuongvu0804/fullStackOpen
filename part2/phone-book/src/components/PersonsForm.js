import React from "react";
import phonebookService from "../services/phonebookService";

const PersonForm = ({
  newName,
  setNewName,
  newPhone,
  setNewPhone,
  persons,
  setPersons,
  noti,
  setNoti
}) => {
  const checkCompleted = () => {
    if (newName && newPhone) return true;
    return false;
  };

  const clearInputs = () => {
    setNewName("");
    setNewPhone("");
  }
  const handleCheckName = (name) => {
    return persons.find((person) => person.name === name);
  };

  const handleUpdatePerson = (existedPerson) => {
    if ( window.confirm(
        `${existedPerson.name} is already added to the phonebook, replace the old number with a new one`
      )) {
      phonebookService
        .update(existedPerson.id, { ...existedPerson, number: newPhone })

        .then(data => {
          setPersons(persons.map((person) => person.id === existedPerson.id ? data : person ))
          clearInputs()
        })

        .catch(data => {
          setNoti(`Information of ${existedPerson.name} was already deleted from server`)
          setPersons(persons.filter((person) => person.id !== existedPerson.id ))
          clearInputs()
        })
    }
  };

  const handleAddPerson = (e) => {
    e.preventDefault();

    const isCompleted = checkCompleted();
    const isExisted = handleCheckName(newName);

    if (isCompleted) {
      if (!isExisted) {
        phonebookService
          .create({ name: newName, number: newPhone })
          .then((data) => {
            setPersons([...persons, data])
            setNoti(`Added ${data.name}`)

            clearInputs()
          });
        
      } else {
        handleUpdatePerson(isExisted);
      }
    }
  };

  return (
    <form onSubmit={handleAddPerson}>
      <div>
        Name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <br />
      <div>
        Number:{" "}
        <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
