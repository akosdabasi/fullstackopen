import { useState, useEffect } from "react";
import PhoneBook from "./components/PhoneBook";
import Search from "./components/Search";
import Form from "./components/Form";
import phoneBookService from "./services/phoneBook";
import PopUp from "./components/PopUp";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    phoneBookService.getAll().then((persons) => setPersons(persons));
    console.log("init phonebook");
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewNumber(e.target.value);
  };

  const createPopUp = (message, type, time) => {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => setMessage(null), time);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const foundPerson = persons.find((obj) => obj.name === newName);

    if(!foundPerson) 
    {
      phoneBookService.create({ name: newName, number: newNumber })
        .then((newPerson) => 
        {
          setPersons(persons.concat(newPerson));
          createPopUp(`${newPerson.name} has been created`, "info", 3000);
        })
        .catch(err => createPopUp(err.response.data,"error", 3000));
    } 
    else if(window.confirm(`${newName} is already in the phonebook.\nDo you wish to update his number?`)) 
    {
      const newPerson = { ...foundPerson, number: newNumber };
      phoneBookService.update(newPerson)
        .then(updatedPerson => 
        {
          setPersons(persons.map(person =>person._id === foundPerson._id ? updatedPerson : person));
          createPopUp(`${newPerson.name} number has been updated`, "info", 3000);
        })
        .catch(err => createPopUp(err.response.data,"error", 3000));
    }
  };

  const handleSearchChange = (e) => {
    //console.log(e);
    setSearch(e.target.value);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete it?`))
      phoneBookService
        .remove(id)
        .then((res) => {
          setPersons(persons.filter((person) => person._id !== id));
          createPopUp(
            "Person has been deleted from the phonebook",
            "info",
            3000
          );
        })
        .catch((res) => {
          createPopUp(res.message, "error", 3000);
        });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <PopUp message={message} className={messageType} />
      <Search handleSearchChange={handleSearchChange} />
      <h2>Add new</h2>
      <Form
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        handleNameSubmit={handleNameSubmit}
      />
      <h2>Numbers</h2>
      <PhoneBook
        persons={persons}
        search={search}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
