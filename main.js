import { changeBackground } from "./utils/dinamicBackground.js";
import { getCloseCities } from "./utils/fetchApi.js";
import { createClouds } from "./utils/rainClouds.js";
import './utils/weatherCard.js';

const latLong = {
	"lat": '-21.540421424909482',
	"long": '-6.90431558208726'
};

let closeCities = [];
let lat = Number(latLong.lat);
let long = Number(latLong.long);
let cont = 1;

while (cont <= 8) {
	lat *= Number(`1.00${cont}`);
	long *= Number(`1.00${cont}`);
	closeCities.push(await getCloseCities(lat, long));
	cont++;
}

const createCitiesCards = (name, temp, icon) => {
	const cardsContainer = document.querySelector('.cards-container');
	
	const card = document.createElement('weather-card');
	card.setAttribute('name', name);
	card.setAttribute('degree', temp);
	card.setAttribute('icon', `http://openweathermap.org/img/wn/${icon}@2x.png`);
	
	cardsContainer.appendChild(card);
}

closeCities.forEach(city => {
	createCitiesCards(city.name, city.main.temp, city.weather[0].icon);
});

changeBackground();

/**
 * NUMERO DE NUVENS DE ACORDO COM A SITUACAO CLIMATICA
 */

let place = await getCloseCities(latLong.lat, latLong.long);
console.log(place);
let numberClouds = 0;

if (place.weather[0].main.toLowerCase() == 'clouds')
	numberClouds = 5;
if (place.weather[0].main.toLowerCase() == 'rain')
	numberClouds = 10;

while (numberClouds > 0) {
	createClouds();
	numberClouds--;
}