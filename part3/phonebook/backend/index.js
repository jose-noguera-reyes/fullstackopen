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

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findById(id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

// POST REQUEST
app.post('/api/persons', (req, res, next) => {
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

            return person.save()
                .then(savedPerson => {
                    res.json(savedPerson)
                })
        })
        .catch(error => next(error))
})

// PUT REQUEST
app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const { name, number } = req.body

    Person.findById(id)
        .then(person => {
            if (!person) {
                return res.status(404).end()
            }

            person.name = name
            person.number = number

            return person.save().then((updatedPerson) => {
                res.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

// DELETE REQUEST
app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndDelete(id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

// ERROR HANDLING
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

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