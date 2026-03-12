const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

console.log('env', process.env.MONGODB_URI)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: v => /^\d{2,3}-\d+$/.test(v),
            message: 'Phone number must contain 2-3 numbers followed by a dash followed by numbers like 00-00000 or 000-0000'
        },
        required: true
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
            delete returnedObject._id,
            delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)