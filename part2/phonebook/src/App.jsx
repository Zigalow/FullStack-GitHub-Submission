import {useState, useEffect} from "react";
import Filter from "./Components/Filter.jsx";
import PersonForm from "./Components/PersonForm.jsx";
import Persons from "./Components/Persons.jsx";
import personService from "./Services/persons.js"
import Notification from "./Components/Notification.jsx";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchWord, setSearchWord] = useState("")
    const [notificationMessage, setNotificationMessage] = useState("Add, update or delete a record in the phonebook")
    const [notificationType, setNotificationType] = useState("success")

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
                setNotificationType("success")
                setNotificationMessage(`Added ${personObject.name}`)
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
                setNotificationMessage(`Updated ${updatedPerson.name}`)
                setNotificationType("success")
                setNewName("")
                setNewNumber("")
            })
            .catch(error => {
                setPersons(persons.filter(p => p.id !== personToUpdate.id))
                setNotificationMessage(`Information of ${updatedPerson.name} has already been removed from the server`)
                setNotificationType("error")
            })
    }

    const deletePerson = (personName, id) => {
        const shouldDelete = window.confirm(`Delete ${personName}?`)

        if (shouldDelete) {
            personService
                .deleteObject(id)
                .then(deletedPerson => {
                    setPersons(persons.filter(p => p.id !== id))
                    setNotificationMessage(`Deleted ${deletedPerson.name}`)
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
            <Notification message={notificationMessage} type={notificationType}/>
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
