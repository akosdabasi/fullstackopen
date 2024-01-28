import "./PhoneBook.css";

const PhoneBook = ({ persons, search, handleDelete }) =>
  persons
    .filter((person) =>
      person.name.toLowerCase().startsWith(search.toLocaleLowerCase())
    )
    .map((person) => (
      <div key={person._id}>
        <span className="data">{person.name}</span>
        <span className="data">{person.number}</span>
        <button
          className="deleteButton"
          onClick={() => handleDelete(person._id)}
        >
          delete
        </button>
      </div>
    ));

export default PhoneBook;
