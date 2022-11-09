import './components/MainCard/MainCard.js'

import fetchWeather from "./apis/fetchWeather.js";
const form = document.querySelector('form')

const main = document.querySelector('body')
const mainCardContainer = document.querySelector('.main-card__container');

const criaCardPrincipal = (data) => {
  const cardPrincipal = document.createElement('main-card');
  cardPrincipal.setAttribute('city-name', `${data.name}, ${data.sys.country}`);
  cardPrincipal.setAttribute('conditions-status', data.weather[0].description)
  cardPrincipal.setAttribute('icon', data.weather[0].icon)
  cardPrincipal.setAttribute('atual-temp', data.main.temp)
  cardPrincipal.setAttribute('min-temp', data.main.temp_min)
  cardPrincipal.setAttribute('max-temp', data.main.temp_max)
  cardPrincipal.setAttribute('humidity', data.main.humidity)
  cardPrincipal.setAttribute('wind-velocity', data.wind.speed)
  cardPrincipal.setAttribute('wind-deg', data.wind.deg)
  mainCardContainer.appendChild(cardPrincipal);

  
}

export const cleanDiv = () => {
  mainCardContainer.innerHTML = '';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const search = document.querySelector('.search-input').value || 'Osasco';
  const data = await fetchWeather(search);
  if (mainCardContainer.childElementCount >= 1){
    cleanDiv();
  };
  criaCardPrincipal(data);
})

// const weather = await fetchWeather(search);
