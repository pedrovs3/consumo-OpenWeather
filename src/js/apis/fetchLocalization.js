import env from '../../../env.js'
const apiKey = env.APIkey;

let fetchLocalization;

export default fetchLocalization = async (pesquisa = 'luanda') => {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${pesquisa}&limit=2&appid=${apiKey}`)
    const data = await response.json()
    console.log(await data);
    return data;
}