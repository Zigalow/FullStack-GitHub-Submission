import {useState} from "react";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas'}
    ])
    const [newName, setNewName] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName
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
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map(person => (
                    <li key={person.name}>
                        {person.name}
                    </li>
                ))}
            </div>
        </div>

    )
}

export default App