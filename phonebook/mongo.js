const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
};
const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.t5cyzxi.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
});
  
const Phonebook = mongoose.model('Phonebook', personSchema);


if (process.argv.length === 3) {
    Phonebook.find({}).then(result => {
        console.log('phonebook: ');
        result.forEach(note => {
          console.log(note);
        });
        mongoose.connection.close();
      });
} else {
    const person = new Phonebook({
        name: process.argv[3],
        number: process.argv[4],
    });

    person.save().then(result => {
        console.log(result);
        console.log(`added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close();
    });
}
