import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import { useState, useEffect } from 'react'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

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
        const updatedPerson = {...nameAlreadyExists, number: newNumber}
        
        personsService
          .updatePerson(nameAlreadyExists.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== nameAlreadyExists.id ? person : returnedPerson))
            setNewName("")
            setNewNumber("") 
          })
      }
    } else if (numberAlreadyExists) {
      console.log(`Number ${newNumber} already exists`)
      alert(`Number "${newNumber}" already exists`)
    } else {
      personsService
        .createPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("") 
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
    const person = persons.find(p => p.id === id)
    
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
      <h2>Phonebook</h2>
      <Filter filterValue={newFilter} filterHandle={handleFilterChange} />

      <h3>Add a new person</h3>
      <PersonForm submitForm={addPerson} nameValue={newName} nameHandle={handleNameChange} numberValue={newNumber} numberHandle={handleNumberChange}/>

      <h3>Numbers</h3>
      <Persons persons={personsToShow} deleteHandle={handleDelete}/>
    </div>
  )
}

export default App