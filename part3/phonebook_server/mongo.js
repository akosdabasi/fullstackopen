const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const db_url = `mongodb+srv://dabasiakos:${password}@cluster0.gamoyot.mongodb.net/phoneBook?retryWrites=true&w=majority`;

mongoose.set('strictQuery',false)
mongoose.connect(db_url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
const Person = mongoose.model('Person', personSchema);

if(process.argv.length === 3){
    console.log("phonebook:");
    Person.find({}).then(result => 
        {
            result.forEach(person => console.log(person.name, person.number));
            mongoose.connection.close();
        })
}
else if(process.argv.length < 5){
    console.log("if you want to add new records to the db, name and number fields are mandatory");
     mongoose.connection.close();
}
else{
    const person = new Person({
        name,
        number,
    })
    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to the phonebook.`)
        mongoose.connection.close()
    })
}




