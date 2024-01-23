const PhoneBook = ({persons, search}) => persons.filter(person => person.name.toLowerCase().startsWith(search.toLocaleLowerCase())).map(person => <p key={person.name}>{person.name} {person.number}</p>)

export default PhoneBook