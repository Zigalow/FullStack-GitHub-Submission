import axios from "axios";

const baseWeatherIconUrl = "https://openweathermap.org/payload/api/media/file/"
const baseWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?"
const baseCityUrl = "http://api.openweathermap.org/geo/1.0/direct?"

const api_key = import.meta.env.VITE_WEATHER_API_KEY

const getInfoFromCity = (cityName, countryCode) => {
    const request = axios.get(`${baseCityUrl}q=${cityName},${countryCode}&limit=5&appid=${api_key}`)
    return request.then(response => response.data)
}


const getWeather = (cityName, countryCode) => {

    return getInfoFromCity(cityName, countryCode)
        .then(countryInfoRequest => {
            console.log("countryInfo", countryInfoRequest[0]);
            console.log("lat:", countryInfoRequest[0].lat);
            console.log("lon:", countryInfoRequest[0].lon);

            const lat = countryInfoRequest[0].lat;
            const lon = countryInfoRequest[0].lon;

            return axios.get(`${baseWeatherUrl}lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
        }).then(response => response.data)
}

const getWeatherPicture = (resource) => {

    const request = axios.get(`${baseWeatherIconUrl}${resource}`)
    return request.then(response => response.data)
}



export default { getTemperature: getWeather }