import { useEffect, useState } from "react";
import Searchbar from "./Components/Searchbar.jsx";
import countryService from "./services/countries.js"
import weatherService from "./services/weather.js"
import ListedCountries from "./Components/ListedCountries.jsx"


const App = () => {
    const [allCountries, setCountries] = useState([])
    const [searchWord, setSearchWord] = useState("")
    const [filteredCountries, setFilteredCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [countryWeather, setWeather] = useState(null)
    const [isNew, setIsNew] = useState(true)

    useEffect(() => {
        countryService
            .getAll()
            .then(initialCountries => {
                setCountries(initialCountries)
            })
    }, [])


    useEffect(() => {

        if (!selectedCountry) {
            setWeather(null)
            return
        }
        weatherService
            .getTemperature(selectedCountry.capital[0], selectedCountry.cca2)
            .then(weather => {
                setWeather(weather)
                console.log("weather", weather)
            })

    }, [selectedCountry])


    const showSpecificCountry = (countryName) => {
        countryService.
            getSpecific(countryName)
            .then(specificCountry => {
                setSelectedCountry(specificCountry)
            })
        setSearchWord(countryName.toLowerCase())
    }

    const handleSearchChange = (event) => {
        setIsNew(false)
        event.preventDefault()
        const searchWordObject = event.target.value.toLowerCase()
        setSearchWord(searchWordObject)

        const filteredCountriesObject = filterCountries(searchWordObject)

        filteredCountriesObject.length === 1
            ? setSelectedCountry(filteredCountriesObject[0])
            : setSelectedCountry(null);

    }

    const filterCountries = (searchWord) => {
        const filteredCountriesObject = searchWord === ""
            ? allCountries
            : allCountries.filter(c => c.name.common.toLowerCase().includes(searchWord))

        setFilteredCountries(filteredCountriesObject)


        return filteredCountriesObject
    }

    return (
        <div>
            <Searchbar searchWord={searchWord} handleSearchChange={handleSearchChange} />
            <ListedCountries country={selectedCountry} weather={countryWeather} countries={filteredCountries} isNew={isNew} showSpecificCountry={showSpecificCountry} />
        </div>
    )
}

export default App
