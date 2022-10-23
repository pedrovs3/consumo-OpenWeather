import env from '../../env.js'

const APIkey = env.API_KEY

import './components/MainCard.js'
import fetchWeather from "./apis/fetchWeather.js";

const main = document.querySelector('.a')

const search = 'luanda'

console.log(await fetchWeather(search));
