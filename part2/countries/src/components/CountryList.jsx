import { useState, useEffect } from 'react'
import openWeatherService from '../services/openweather'

const Weather = ({ city }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        openWeatherService
            .getWeather({ city })
            .then(data => {
                setWeather(data)
            })
    }, [city])

    if (weather === null) return null

    return (
        <div>
            <h2>Weather in {city}</h2>
            <p><b>Temperature: </b>{weather.main.temp}°C</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
            <p><b>Wind: </b>{weather.wind.speed} m/s</p>
        </div>
    )
}

const CountryDetail = ({ country }) => {
    const languages = Object.values(country.languages)
    
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p><b>Capital:</b> {country.capital[0]}</p>
            <p><b>Area:</b> {country.area} km²</p>
            <h2>Languages</h2>
            <ul>
                {languages.map(language =>
                    <li key={language}>
                        {language}
                    </li>
                )}
            </ul>
            <img src={country.flags.png} />
            <Weather city={country.capital[0]} />
        </div>
    )
}

const CountryList = ({ countries, showHandle, selectedCountry }) => {
    if (selectedCountry === null) {
        if (countries.length > 10) {
            return (
                <div>
                    Too many matches, specify another filter.
                </div>
            )
        } else if (countries.length > 1) {
            return (
                <div>
                    <ul>
                        {countries.map(country =>
                            <li key={country.name.common}>
                                {country.name.common}
                                <button onClick={() => showHandle(country)}>show</button>
                            </li>)}
                    </ul>
                </div>
            )
        } else if (countries.length === 1) {
            return (
                <CountryDetail country={countries[0]} />
            )
        }
    } else {
        return (
            <div>
                <CountryDetail country={selectedCountry} />
            </div>
        )
    }
}

export default CountryList