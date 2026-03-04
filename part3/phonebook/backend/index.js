require('dotenv').config()
const express = require('express')
const Person = require('./models/person.js')

const app = express()
var morgan = require('morgan')

morgan.token('post', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ' '
})

app.use(express.json())
app.use(express.static('dist'))
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :post'),
)


let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/api/persons/:id', (request, response) => {
    console.log("id", request.params.id)
    Person.findById(request.params.id.toString()).then(person => {
        response.json(person)
    })
})


app.post('/api/persons', (request, response) => {

    const body = request.body

    if (!body.number) {
        return response.status(400).json(
            { error: 'number is missing' }
        )
    }

    if (!body.name) {
        return response.status(400).json(
            { error: 'name is missing' }
        )
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})



app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const infoText = Person.length === 0
    ? `Phonebook does not currently have info on any people`
    : Person.length === 1
        ? `Phonebook has info for 1 person`
        : `Phonebook has info for ${persons.length} people`


app.get('/info', (request, response) => {

    const currentDate = new Date().toLocaleString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone


    response.send(`
          <div>
                <p>${infoText}</p>
                <p>${Date()}</p>
            </div>
           `)
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})