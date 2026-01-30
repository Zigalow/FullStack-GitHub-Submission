import { useEffect, useState } from "react";
import Searchbar from "./Components/Searchbar.jsx";
import countryService from "./services/countries.js"
import Display from "./Components/Display.jsx"
import { use } from "react";

const App = () => {
    const [countries, setCountries] = useState([])
    const [searchWord, setSearchWord] = useState("")
    const [filteredCountries, setFilteredCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(() => {
        countryService
            .getAll()
            .then(initialCountries => {
                setCountries(initialCountries)
            })
    }, [])

    const showSpecificCountry = (countryName) => {
        countryService.
            getSpecific(countryName)
            .then(specificCountry => {
                setSelectedCountry(specificCountry)
            })
        setSearchWord(countryName.toLowerCase())
    }

    const handleSearchChange = (event) => {
        event.preventDefault()
        const searchWordObject = event.target.value.toLowerCase()
        setSearchWord(searchWordObject)

        const filteredCountriesObject = filterCountries(searchWordObject)

        filteredCountriesObject.length === 1
            ? setSelectedCountry(filteredCountriesObject[0])
            : setSelectedCountry(null)

    }


    const filterCountries = (searchWord) => {
        const filteredCountriesObject = searchWord === ""
            ? countries
            : countries.filter(c => c.name.common.toLowerCase().includes(searchWord))

        setFilteredCountries(filteredCountriesObject)


        return filteredCountriesObject
    }

    return (
        <div>
            <Searchbar searchWord={searchWord} handleSearchChange={handleSearchChange} />
            <Display country={selectedCountry} countries={filteredCountries} showSpecificCountry={showSpecificCountry} />
        </div>
    )
}

export default App
