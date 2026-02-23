const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argumnet')
    process.exit('1')
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.c7wycni.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String
})

const Person = new mongoose.model('person', personSchema)

if (process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
else if (process.argv.length === 5) {
    const person = new Person({
        name: `${process.argv[3]}`,
        number: `${process.argv[4]}`
    })

    person.save().then(result => {
        console.log(`Added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })

}
else {
    console.log('wrong number of arguments')
    process.exit('1')
}

