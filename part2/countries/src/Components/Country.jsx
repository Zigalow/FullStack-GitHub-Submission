import countries from "../services/countries.js";

const Country = ({ country, weather }) => {


    if (!weather) { return }

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
            <div>
                <h2>Weather in {country.capital}</h2>
                <p>Temperature {weather.main.temp} Celsius</p>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    width={100}
                />
                <p>Wind {weather.wind.speed} m/s</p>
            </div>
        </>
    )
}

export default Country