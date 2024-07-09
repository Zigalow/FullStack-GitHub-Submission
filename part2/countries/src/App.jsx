import {useEffect, useState} from "react";
import Searchbar from "./Components/Searchbar.jsx";
import countryService from "./services/countries.js"
import Display from "./Components/Display.jsx"

const App = () => {
    const [countries, setCountries] = useState([])
    const [searchWord, setSearchWord] = useState("")

    useEffect(() => {
        countryService
            .getAll()
            .then(initialCountries => {
                setCountries(initialCountries)
            })
    }, [])

    const showSpecificCountry = (countryName) => {
        setSearchWord(countryName.toLowerCase())
    }

    const handleSearchChange = (event) => {
        event.preventDefault()
        setSearchWord(event.target.value.toLowerCase())
    }

    const filteredCountries = searchWord === ""
        ? countries
        : countries.filter(c => c.name.common.toLowerCase().includes(searchWord))

    return (
        <div>
            <Searchbar searchWord={searchWord} handleSearchChange={handleSearchChange}/>
            <Display countries={filteredCountries} showSpecificCountry={showSpecificCountry}/>
        </div>
    )
}

export default App
