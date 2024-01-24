import { useState, useEffect } from 'react'
import PhoneBook from './components/PhoneBook'
import Search from './components/Search'
import Form from './components/Form'
import axios from 'axios'
import numbersService from './services/numbers'
import PopUp from './components/PopUp'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  useEffect(()=>{

    numbersService.getAll()
      .then(numbers => setPersons(numbers))
    console.log('init phonebook');

  }, [])

  const handleNameChange = (e)=>{
    //console.log(e);
    setNewName(e.target.value);
  }

  const handlePhoneChange = (e)=>{
    //console.log(e);
    setNewPhone(e.target.value);
  }

  const handleNameSubmit = (e)=>{
    e.preventDefault();
    //console.log(e);
    const foundPerson = persons.find(obj => obj.name === newName);

    if(!foundPerson)
    {
      numbersService.create({name: newName, number: newPhone})
        .then(newPerson => {
          setPersons(persons.concat(newPerson));
          setMessage(`${newPerson.name} has been added to the phonebook`);
          setMessageType(`notification`); 
          setTimeout(() => setMessage(null), 3000)
        })
    }
    else if(window.confirm(`${newName} is already in the phonebook.\nDo you wish to update his number?`))
    {
      const newPerson = {...foundPerson, number: newPhone};
      numbersService.update(newPerson)
        .then( _ => {
          setPersons(persons.map((person) => person.id === foundPerson.id ? newPerson : person));
          setMessage(`${newPerson.name}'number has been updated`);
          setMessageType(`notification`); 
          setTimeout(() => setMessage(null), 3000)  
        })
    }
      
        
  }

  const handleSearchChange = (e)=>{
    //console.log(e);
    setSearch(e.target.value); 
  }

  const handleDelete = (id) => {
    if(window.confirm(`Are you sure you want to delete it?`))
      numbersService.remove(id)
        .then(res => {
          setPersons(persons.filter(person => person.id !== id));
          setMessage(`Person has been deleted from the phonebook`);
          setMessageType(`notification`); 
          setTimeout(() => setMessage(null), 3000)
        })
        .catch( res => {
          console.log(res);
          setMessage(`res`);
          setMessageType(`error`); 
          setTimeout(() => setMessage(null), 3000)
        })
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <PopUp message={message} className={messageType}/>
      <Search handleSearchChange={handleSearchChange}/>
      <h2>Add new</h2>
      <Form handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} handleNameSubmit={handleNameSubmit}/>
      <h2>Numbers</h2>
      <PhoneBook persons={persons} search={search} handleDelete={handleDelete}/>
      
    </div>
  )
}

export default App