import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas",
      number: "040-1234567",
      id: 1 }
  ]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    console.log("add person button clicked", event.target)

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const nameAlreadyExists = persons.find((person) => person.name === newName)
    const numberAlreadyExists = persons.find((person) => person.number === newNumber)

    if (nameAlreadyExists) {
      console.log(`Person named "${newName}" already exists`)
      alert(`Person named "${newName}" already exists`)
    } else if (numberAlreadyExists) {
      console.log(`${newName} already exists`)
      alert(`Number "${newNumber}" already exists`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")
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

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={newFilter} filterHandle={handleFilterChange} />

      <h3>Add a new person</h3>
      <PersonForm submitForm={addPerson} nameValue={newName} nameHandle={handleNameChange} numberValue={newNumber} numberHandle={handleNumberChange}/>

      <h3>Numbers</h3>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App