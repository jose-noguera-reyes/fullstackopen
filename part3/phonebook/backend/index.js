require('dotenv').config()

const express = require('express')
const morgan = require('morgan')

const Person = require('./models/person')

const app = express()

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// GET REQUESTS
app.get('/', (req, res) => {
    res.send('<h1>Phonebook</h1>')
})

app.get('/info', (req, res) => {
    const date = new Date()

    Person.countDocuments({})
        .then(count => {
            res.send(`
                <p>Phonebook has info for ${count} people.</p>
                <p>${date}</p>
            `)
        })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findById(id).then(person => {
        res.json(person)
    })
})

// POST REQUEST
app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }

    Person.findOne({ name: body.name })
        .then(existingPerson => {
            if (existingPerson) {
                return res.status(400).json({
                    error: 'name already exists'
                })
            }

            const person = new Person({
                name: body.name,
                number: body.number,
            })

            return person.save().then(savedPerson => {
                res.json(savedPerson)
            })
        })
})

// DELETE REQUEST
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findByIdAndDelete(id)
        .then(result => {
            res.status(204).end()
        })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})