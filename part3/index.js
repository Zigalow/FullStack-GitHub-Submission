const express = require('express')
const app = express()

app.use(express.json())

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
    response.json(persons)
})

const infoText = persons.length === 0
    ? `Phonebook does not currently have info on any people`
    : persons.length === 1
        ? `Phonebook has info for 1 person`
        : `Phonebook has info for ${persons.length} people`

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})


app.post('/api/persons', (request, response) => {

    const body = request.body

    console.log("request body", body)

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

    if (persons.map(p => p.name).includes(body.name)) {
        return response.status(409).json(
            { error: 'name must be unique' }
        )
    }

    const person = {
        name: body.name,
        number: body.number
    }


    console.log("Person before getting id", person)


    while (!person.id || persons.map(p => p.id).includes(persons.id)) {



        person.id = String(getRandomIntInclusive(1, 10000))
        console.log("Person after getting id", person)

    }



    persons = persons.concat(person)

    response.json(person)


})


function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}



app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})



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





const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)