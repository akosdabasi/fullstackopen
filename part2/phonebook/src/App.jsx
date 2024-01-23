import { useState, useEffect } from 'react'
import PhoneBook from './components/PhoneBook'
import Search from './components/Search'
import Form from './components/Form'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  useEffect(()=>{

    axios.get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))

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
    const person = {name: newName, number: newPhone};
    if(persons.find(obj => obj.name === person.name) === undefined)
      setPersons(persons.concat(person))
    else
      alert(`${newName} is already in the phonebook`)
  }

  const handleSearchChange = (e)=>{
    //console.log(e);
    setSearch(e.target.value); 
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Search handleSearchChange={handleSearchChange}/>
      <h2>Add new</h2>
      <Form handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} handleNameSubmit={handleNameSubmit}/>
      <h2>Numbers</h2>
      <PhoneBook persons={persons} search={search}/>
      
    </div>
  )
}

export default App