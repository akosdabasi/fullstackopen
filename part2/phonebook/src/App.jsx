import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '06203140000' }
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
      search: <input onChange={handleSearchChange}/>
      <h2>Add new</h2>
      <form onSubmit={handleNameSubmit}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          phone: <input onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().startsWith(search.toLocaleLowerCase())).map(person => <p key={person.name}>{person.name} {person.phone}</p>)}
    </div>
  )
}

export default App