const PhoneBook = ({persons, search, handleDelete}) => persons.filter(person => person.name.toLowerCase().startsWith(search.toLocaleLowerCase())).map(person => 
<span key={person.id}>
    <p>{person.name} {person.number}</p>
    <button onClick={() => handleDelete(person.id)}>delete</button>
</span>)

export default PhoneBook