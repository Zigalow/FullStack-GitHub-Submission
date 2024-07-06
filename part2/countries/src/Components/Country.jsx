import countries from "../services/countries.js";

const Country = ({country}) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>

            <div>
                <b>languages:</b>
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