const Persons = ({filteredPersons, deletePerson}) => {
    const label = "delete"
    return (
        <>
            {filteredPersons.map(person => (
                <li key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => deletePerson(person.name, person.id)}>{label}</button>
                </li>
            ))}
        </>
    )

}

export default Persons