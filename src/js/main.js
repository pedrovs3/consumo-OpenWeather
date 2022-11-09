import { changeBackground } from "./dinamicBackground.js";
import { getCloseCities } from "./utils/fetchApi.js";
import { createClouds } from "./rainClouds.js";
import fetchLocalization from "./apis/fetchLocalization.js";
import './weatherCard.js';

const cardsContainer = document.querySelector('.cards-container');

const form = document.querySelector('form')

let lat = -23.5325;
let lon = -46.7917;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const search = document.querySelector('.search-input').value || 'Osasco';
  const geolocation = await fetchApi(search);
	console.log(geolocation, 'aaaaaa');
	lat = geolocation[0].lat;
	lon = geolocation[0].lon;

	const cleanDiv = () => {
		cardsContainer.innerHTML = '';
		closeCities = closeCities.slice(9, -1);
	}

	cont = 0;
	while (cont <= 8) {
		lat *= Number(`1.00${cont}`);
		console.log(lat)
		lon *= Number(`1.00${cont}`);
		closeCities.push(await getCloseCities(lat, lon));
		cont++;
	}

	if(cardsContainer.childElementCount >= 8) {
		cleanDiv();
	}		

	closeCities.forEach(city => {
		createCitiesCards(city.name, city.main.temp, city.weather[0].icon);
	});

	return geolocation;
})

const fetchApi = async (search = 'Osasco') => {
	const geolocation = await fetchLocalization(search)
	return geolocation;
}

let closeCities = [];
let cont = 1;


console.log(closeCities)

const createCitiesCards = (name, temp, icon) => {
	const cardsContainer = document.querySelector('.cards-container');
	
	const card = document.createElement('weather-card');
	card.setAttribute('name', name);
	card.setAttribute('degree', temp);
	card.setAttribute('icon', `http://openweathermap.org/img/wn/${icon}@2x.png`);

	
	cardsContainer.appendChild(card);
}

// closeCities.forEach(city => {
// 	createCitiesCards(city.name, city.main.temp, city.weather[0].icon);
// });

changeBackground();

/**
 * NUMERO DE NUVENS DE ACORDO COM A SITUACAO CLIMATICA
 */


let place = await getCloseCities(lat, lon);

console.log(place)
let numberClouds = 0;

if (place.weather[0].main.toLowerCase() == 'clouds')
	numberClouds = 5;
if (place.weather[0].main.toLowerCase() == 'rain')
	numberClouds = 10;

while (numberClouds > 0) {
	createClouds();
	numberClouds--;
}