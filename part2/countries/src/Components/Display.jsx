import Country from "./Country.jsx"

const Display = ({ country, countries, showSpecificCountry }) => {


    if (country) {
        return (
            <Country country={country} />
        )

    }

    if (countries.length > 10) {
        return (
            <>
                <p>Too many matches, specify another filter</p>
            </>
        )
    }

    return (
        <>
            {countries.map(c => (
                <li key={c.name.common}>
                    {c.name.common}
                    <button onClick={() => showSpecificCountry(c.name.common)}>show</button>
                </li>
            ))}
        </>
    )
}

export default Display