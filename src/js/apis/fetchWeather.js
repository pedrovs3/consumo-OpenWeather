import fetchLocalization from "./fetchLocalization.js";
import env from "../../../env.js";

const apiKey = env.APIkey

let fetchAPI;
export default fetchAPI = async (search = 'Osasco') => {
    console.log(search)
    const geolocation = await fetchLocalization(search);
    console.log(geolocation);
    const lat = geolocation[0].lat
    const lon = geolocation[0].lon
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&units=metric&appid=${apiKey}`)
    const data = await response.json()
    console.log(data)
    return data;
};