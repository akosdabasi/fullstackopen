import "./Form.css";

const Form = ({ handleNameChange, handlePhoneChange, handleNameSubmit }) => (
  <form onSubmit={handleNameSubmit}>
    <div className="input">
      name: <input onChange={handleNameChange} />
    </div>
    <div className="input">
      phone: <input onChange={handlePhoneChange} />
    </div>
    <div>
      <button className="addButton" type="submit">
        add
      </button>
    </div>
  </form>
);

export default Form;
