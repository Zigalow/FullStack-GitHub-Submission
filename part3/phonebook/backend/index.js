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

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(person => {
        response.json(person)
    })
        .catch(error => { next(error) })
})

app.get('/api/persons/:id', (request, response, next) => {
    console.log("id", request.params.id)
    Person.findById(request.params.id).then(person => {
        response.json(person)
    }).catch(error => {
        next(error)
    })
})


app.post('/api/persons', (request, response, next) => {

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
        .catch(error => { next(error) })
})


app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findById(request.body.id).then(person => {
        if (!person) {
            return response.status(404).end()
        }

        person.name = name
        person.number = number


        person.save().then(updatedPerson => {
            response.json(updatedPerson).end()

        })
            .catch(error => { next(error) })

    })
        .catch(error => { next(error) })

})


app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(result => {
        response.status(204).end()
    })
        .catch(error => {
            next(error)
        })
})

const infoText = Person.length === 0
    ? `Phonebook does not currently have info on any people`
    : Person.length === 1
        ? `Phonebook has info for 1 person`
        : `Phonebook has info for ${Person.length} people`


app.get('/info', (request, response) => {
    response.send(`
          <div>
                <p>${infoText}</p>
                <p>${Date()}</p>
            </div>
           `)
})

const unknownEndpoint = (request, response) => {
    return response.status(404).send({ error: 'unknown endpoint' })
}


app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})