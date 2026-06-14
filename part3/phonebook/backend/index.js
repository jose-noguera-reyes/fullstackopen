const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

// GET REQUESTS
app.get('/', (req, res) => {
    res.send('<h1>Phonebook</h1>')
})

app.get('/info', (req, res) => {
    const date = new Date()

    res.send(`
        <p>Phonebook has info for ${persons.length} people.</p>
        <p>${date}</p>
    `)
})

app.get('/api/persons', (req, res) => {
    res.send(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

// POST REQUEST
const generateId = () => {
    const id = Math.floor(Math.random() * 1000000) + 1
    return String(id)
}

const nameAlreadyExists = (name) => persons.find(person => person.name === name)

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    } else if (nameAlreadyExists(body.name)) {
        return res.status(400).json({
            error: 'name already exists'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    res.json(person)
})

// DELETE REQUEST
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})