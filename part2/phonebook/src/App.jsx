import { useState } from 'react'
import PhoneBook from './components/PhoneBook'
import Search from './components/Search'
import  Form  from './components/Form'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

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
    const person = {name: newName, phone: newPhone};
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