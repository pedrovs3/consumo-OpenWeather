const APIkey = '379ea8d330a1373f50840b2a23f50de6'

const fetchLocalizacao = async (pesquisa = 'Nottingham') => {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${pesquisa}&limit=2&appid=${APIkey}`)
  const data = await response.json()
  return data;
}

const fetchAPI = async () => {
  const geolocation = await fetchLocalizacao();
  const lat = geolocation[0].lat
  const lon = geolocation[0].lon
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&units=metric&appid=${APIkey}`)
  const data = await response.json()
  console.log(data)
  return data;
};

// navigator.geolocation.getCurrentPosition(function(position) {
//   const lat = position.coords.latitude;
//   const lon = position.coords.longitude;
//   console.log(position)
// });

const main = document.querySelector('.a')

const principal = async () => {
  const data = await fetchAPI()
  const data1 = await fetchLocalizacao()
  console.log(data1[0])
  
  const h2 = document.createElement('h2')
  h2.textContent = data1[0].name
  main.append(data.weather[0].description)
  main.appendChild(h2);
}

principal()



// const data = await fetchAPI();
// console.log(data)