import { useEffect, useState } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonsForm";
import phonebookService from "./services/phonebookService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [noti, setNoti] = useState({
    type: "info",
    content: null
  })

  useEffect(() => {
    phonebookService
      .getAll()
      .then((data) => setPersons(data));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchValue={searchValue} setSearchValue={setSearchValue} />

      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        persons={persons}
        setPersons={setPersons}
        noti={noti}
        setNoti={setNoti}
      />

     {noti.content && 
        <Notification noti={noti} setNoti={setNoti}/>
      }
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} searchValue={searchValue} />
    </div>
  );
};

export default App;
