import countries from "../services/countries.js";

const Country = ({ country }) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital[0]}</p>
            <p>Area {country.area}</p>

            <div>
                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map(l => (
                        <li key={l}>{l}</li>
                    ))}
                </ul>
            </div>
            <div>
                <img
                    src={country.flags.png}
                    width={200}
                />
            </div>
        </>
    )
}

export default Country