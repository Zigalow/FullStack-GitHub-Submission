import Country from "./Country.jsx"

const Display = ({countries}) => {

    console.log(countries)

    if (countries.length > 10) {
        return (
            <>
                <p>Too many matches, specify another filter</p>
            </>
        )
    }

    if (countries.length === 1) {
        return (
            <Country country={countries[0]}/>
        )
    }

    return (
        <>
            {countries.map(c => (
                <li key={c.name.common}>
                    {c.name.common}
                </li>
            ))}
        </>
    )
}

export default Display