import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useState, useEffect } from 'react'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [newNotification, setNewNotification] = useState({ message: null, type: "" })

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log("add person button clicked", event.target)

    const personObject = {
      name: newName,
      number: newNumber
    }

    const nameAlreadyExists = persons.find((person) => person.name === newName)
    const numberAlreadyExists = persons.find((person) => person.number === newNumber)

    if (nameAlreadyExists) {
      console.log(`Person named "${newName}" already exists`)

      if (window.confirm(`Person named "${newName}" already exists. Do you want to update their phone number?`)) {
        const updatedPerson = { ...nameAlreadyExists, number: newNumber }

        personsService
          .updatePerson(nameAlreadyExists.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== nameAlreadyExists.id ? person : returnedPerson
            ))

            setNewName("")
            setNewNumber("")

            setNewNotification({
              message: `Phone number of ${returnedPerson.name} was updated successfully.`,
              type: "successNotification"
            })

            setTimeout(() => {
              setNewNotification({
                message: null,
                type: ""
              })
            }, 5000)
          })
          .catch(error => {
            console.log(error.response.data.error)

            setNewNotification({
              message: error.response.data.error,
              type: "errorNotification"
            })

            setTimeout(() => {
              setNewNotification({
                message: null,
                type: ""
              })
            }, 5000)
          })
      }
    } else if (numberAlreadyExists) {
      console.log(`Number ${newNumber} is already in use.`)

      setNewNotification({
        message: `Number ${newNumber} is already in use.`,
        type: "errorNotification"
      })

      setTimeout(() => {
        setNewNotification({
          message: null,
          type: ""
        })
      }, 5000)
    } else {
      personsService
        .createPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")

          setNewNotification({
            message: `Person ${returnedPerson.name} was added successfully.`,
            type: "successNotification"
          })

          setTimeout(() => {
            setNewNotification({
              message: null,
              type: ""
            })
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data.error)

          setNewNotification({
            message: error.response.data.error,
            type: "errorNotification"
          })

          setTimeout(() => {
            setNewNotification({
              message: null,
              type: ""
            })
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(`Name change: ${event.target.value}`)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(`Number change: ${event.target.value}`)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(`Filter change: ${event.target.value}`)
    setNewFilter(event.target.value)
  }

  const handleDelete = (id) => {
    if (window.confirm(`Do you want to delete this person?`)) {
      personsService
        .deletePerson(id)
        .then(() => setPersons(persons.filter(p => p.id !== id)))
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={newNotification}/>

      <Filter filterValue={newFilter} filterHandle={handleFilterChange} />

      <h2>Add a new person</h2>
      <PersonForm submitForm={addPerson} nameValue={newName} nameHandle={handleNameChange} numberValue={newNumber} numberHandle={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons persons={personsToShow} deleteHandle={handleDelete}/>
    </div>
  )
}

export default App