import Country from "./Country.jsx"

const ListedCountries = ({ country, weather, countries, isNew, showSpecificCountry }) => {


    if (country) {
        return (
            <Country country={country} weather={weather} />
        )

    }

    if (countries.length > 10) {
        return (
            <>
                <p>Too many matches, specify another filter</p>
            </>
        )
    }

    if (isNew) {
        return <>
            <p>Type to find countries</p>
        </>

    }

    if (countries.length === 0) {
        return (
            <>
                <p>No matches</p>
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

export default ListedCountries