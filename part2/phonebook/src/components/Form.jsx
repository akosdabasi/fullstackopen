const Form = ({handleNameChange, handlePhoneChange, handleNameSubmit}) => 
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


export default Form