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
    <p>Phonebook has info for ${Person.length}<p/>
    <p>${currentTime.toString()}<p/>
    `);
});

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(err => next(err));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if(person)
        res.json(person);
      else
        res.status(404).end();
    })
    .catch(err => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
  .then( deleted => {
    if(deleted) res.status(204).send();
    else res.status(404).send(`document doesn't exist`);
  })
  .catch(err => next(err)); 
});

app.post("/api/persons", (req, res, next) => {
  const data = req.body;
  if(!data.name || !data.number)
    return res.status(400).send(`name and number fields are mandatory`);

  Person.find({name: data.name})
    .then(person => {
      console.log(person);
      if(person.length) 
        res.status(400).send('name has to be unique');
      else
      {
        return Person.create({name: data.name, number: data.number});
      }
    })
    .then(person => res.json(person))
    .catch(err => next(err))
  
})

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  if(!body.number)
    return res.status(400).send(`number is mandatory`);

  Person.findByIdAndUpdate(req.params.id, {name: body.name, number: body.number}, {new: true, runValidators: true, context: 'query'})
    .then(person => res.json(person))
    .catch(err => next(err));
}) 
 

//Middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  //console.error(error.message)

  if(error.name === 'CastError')
  {
    return response.status(400).send({ error: 'malformatted id' });
  }  
  else if(error.name === 'ValidationError') 
  {
    return response.status(400).send({ error: error.message });
  }
  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)


//Starting server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
