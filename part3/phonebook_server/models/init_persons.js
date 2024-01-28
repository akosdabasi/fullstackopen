require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGODB_URI;

console.log(MONGO_URI);

mongoose.set('strictQuery',false)
mongoose.connect(MONGO_URI).then(_ => console.log("persons initialized"));

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
const Person = mongoose.model('Person', personSchema);

async function savePersonsAndClose(persons) {
    try {
        await Person.deleteMany({});
        // Save multiple documents to the database
        await Person.create(persons);

        // Close the connection after saving
        await mongoose.connection.close();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error:', error);
        // Ensure to close the connection even if an error occurs
        await mongoose.connection.close();
    }
}
    
const persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
    },
  ];

savePersonsAndClose(persons);





