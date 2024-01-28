require('dotenv').config();

const express = require("express");
const { v4 } = require("uuid");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
const Person = require('./models/person');



//environment variables
const MONGO_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;


mongoose.set('strictQuery',false);
mongoose.connect(MONGO_URI).then(_=>console.log("connected to mongo..."));



//Middleware

app.use(express.static("dist"));
app.use(cors());
app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body")
);

//Routes
app.get("/", (req, res) => {
  res.send("<h1>hello hello<h1/>");
});

app.get("/info", (req, res) => {
  const currentTime = new Date();
  res.send(`
    <p>Phonebook has info for ${persons.length}<p/>
    <p>${currentTime.toString()}<p/>
    `);
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => res.json(persons));
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id)
    .then(person => {
      if(person)
        res.json(person);
      else
        res.status(404).end();
    })
    .catch(err => console.log(err))
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  console.log(id); 
  Person.findByIdAndDelete(id)
  .then( deleted => {
    if(deleted) res.status(204).send();
    else res.status(500).send(`couldn't delete`);
  })
  .catch(err => res.status(400).send(err)) 
});

app.post("/api/persons", (req, res) => {
  const data = req.body;
  if (!data.name || !data.number)
    return res.status(400).send(`name and number fields are mandatory`);
  /*if (persons.find((pers) => pers.name === data.name))
    return res.status(400).send(`name has to be unique`);*/
  const newPerson = {
    name: data.name,
    number: data.number,
  };
  Person.create(newPerson).then(response => res.json(response));
});

//Middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

//Starting server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
