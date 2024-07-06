import {useState, useEffect} from "react";
import Filter from "./Components/Filter.jsx";
import PersonForm from "./Components/PersonForm.jsx";
import Persons from "./Components/Persons.jsx";
import personService from "./Services/persons.js"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchWord, setSearchWord] = useState("")

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
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
            const shouldReplace = window.confirm(`'${newName}' is already in the phonebook, replace the old number with a new one?`)

            if (shouldReplace) {
                handleDuplicate(personObject, newNumber)
                return
            } else {
                return
            }
        }

        personService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName("")
                setNewNumber("")
            })
    }

    const handleDuplicate = (newPersonObject, newNumber) => {
        const personToUpdate = persons.find(p => p.name.includes(newPersonObject.name))
        const updatedPerson = {...personToUpdate, number: newNumber}

        personService
            .update(personToUpdate.id, updatedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(p => p.id !== personToUpdate.id ? p : returnedPerson))
                setNewName("")
                setNewNumber("")
            })
    }

    const deletePerson = (personName, id) => {
        const shouldDelete = window.confirm(`Delete ${personName}?`)

        if (shouldDelete) {
            personService
                .deleteObject(id)
                .then(/*deletedPerson*/ () => {
                    setPersons(persons.filter(p => p.id !== id))
                })
        }
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
            <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/>
        </div>

    )
}

export default App
