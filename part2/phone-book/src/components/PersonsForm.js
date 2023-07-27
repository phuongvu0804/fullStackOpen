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
  
  const handleValidName = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  
  const handleValidPhoneNumber = (phoneNumber) => {
    return phoneNumber.trim()
  }

  const handleCheckName = (name) => {
    return persons.find((person) => person.name === name);
  };

  const handleUpdatePerson = (existedPerson, validPhoneNumber) => {
    if ( window.confirm(
        `${existedPerson.name} is already added to the phonebook, replace the old number with a new one`
      )) {
      phonebookService
        .update(existedPerson.id, { ...existedPerson, number: validPhoneNumber })

        .then(data => {
          setPersons(persons.map((person) => person.id === existedPerson.id ? data : person ))
          clearInputs()
        })

        .catch(error => {
          setNoti({
            type: 'error',
            content: error.response.data.error
          })
        })
    }
  };

  const handleAddPerson = (e) => {
    e.preventDefault();

    const validName = handleValidName(newName)
    const validPhoneNumber = handleValidPhoneNumber(newPhone)

    const isCompleted = checkCompleted();
    const isExisted = handleCheckName(validName);

    if (isCompleted) {
      if (!isExisted) {
        phonebookService
          .create({ name: validName, number: validPhoneNumber })
          .then((data) => {
            setPersons(persons.concat(data))
            setNoti({
              type: 'success',
              content: `Added ${data.name}`
            })

            clearInputs()
          })
          .catch(error => {
            console.log(error.response.data.error)
            setNoti({
              type: 'error',
              content: error.response.data.error
            })

          })
        
      } else {
        handleUpdatePerson(isExisted, validPhoneNumber);
      }
    }

  };

  return (
    <form onSubmit={handleAddPerson}>
      <div>
        Name:{" "}
        <input value={newName} onChange={e => setNewName(e.target.value)} />
      </div>
      <br />
      <div>
        Number:{" "}
        <input value={newPhone} onChange={e => setNewPhone(e.target.value)} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
