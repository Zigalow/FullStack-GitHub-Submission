import {useState, useEffect} from "react";
import Filter from "./Components/Filter.jsx";
import PersonForm from "./Components/PersonForm.jsx";
import Persons from "./Components/Persons.jsx";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchWord, setSearchWord] = useState("")
    
    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then(response => {
                setPersons(response.data)
            })
    }, [])
    
    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }

        const nameIsDuplicate = persons.map(person =>
            person.name
        ).includes(personObject.name)

        if (nameIsDuplicate) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        setPersons(persons.concat(personObject))
        setNewName("")
        setNewNumber("")
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearchWord(event.target.value)
    }

    const filteredPersons = searchWord === ""
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(searchWord.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchWord={searchWord} handleSearchChange={handleSearchChange}/>
            <h3>add a new </h3>

            <PersonForm addPerson={addPerson}
                        newName={newName}
                        handleNameChange={handleNameChange}
                        newNumber={newNumber}
                        handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <Persons filteredPersons={filteredPersons} />
        </div>

    )
}

export default App
