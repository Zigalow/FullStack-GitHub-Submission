import {useState} from "react";
import Filter from "./Components/Filter.jsx";
import PersonForm from "./Components/PersonForm.jsx";
import Persons from "./Components/Persons.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchWord, setSearchWord] = useState("")

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
