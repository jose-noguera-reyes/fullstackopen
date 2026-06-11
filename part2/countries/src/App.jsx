import CountryList from './components/CountryList'
import Filter from './components/Filter'
import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    console.log(`effect run, value: ${newFilter}`)
    countriesService
      .getAll()
      .then(initialCountries => {
        console.log(initialCountries)
        setCountries(initialCountries)
      })
  }, [])

  const handleChange = (event) => {
    setNewFilter(event.target.value)
    setSelectedCountry(null)
    console.log('selected country: null')
  }
  
  const handleShow = (country) => {
    console.log(`selected country: ${country.name.common}`)
    setSelectedCountry(country)
  }

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <Filter filterValue={newFilter} filterHandle={handleChange} />
      <CountryList countries={countriesToShow} showHandle = {handleShow} selectedCountry={selectedCountry}/>
    </div>
  )
}

export default App
