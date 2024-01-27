const express = require("express");
const { v4 } = require("uuid");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

let persons = [
  {
    id: v4(),
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: v4(),
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: v4(),
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: v4(),
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((pers) => pers.id === id);
  if (person) res.json(person);
  else res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((pers) => pers.id !== id);

  res.status(204).send();
});

app.post("/api/persons", (req, res) => {
  const data = req.body;
  if (!data.name || !data.number)
    return res.status(400).send(`name and number fields are mandatory`);
  if (persons.find((pers) => pers.name === data.name))
    return res.status(400).send(`name has to be unique`);
  const newPerson = {
    id: v4(),
    name: data.name,
    number: data.number,
  };
  persons.push(newPerson);
  res.json(newPerson);
});

//Middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

//Starting server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
