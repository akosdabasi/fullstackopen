const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
    },
    number: {
        type: String,
        minLength: 5,
    }
})
  
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
