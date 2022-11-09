const timeElapsed = Date.now();
const today = new Date(timeElapsed);

class MainCard extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.cityName = 'City Name';
        this.icon = 'https://cdn-icons-png.flaticon.com/512/3104/3104619.png';
        this.conditionStatus = 'Chuva';
        this.tempAtual = ''
        this.minTemp = '';
        this.maxTemp = '';
        this.humidity = '';
        this.windVelocity = '';
        this.windDeg = '';
        this.localData = `${today.toDateString()}, ${today.toTimeString().slice(0, 5)}h`;
    }

    static get observedAttributes() {
        return ['city-name', 'icon', 'conditions-status', 'atual-temp', 'min-temp', 'max-temp', 'humidity', 'wind-velocity', 'wind-deg']
    }

    connectedCallback() {
        this.shadow.appendChild(this.component())
        this.shadow.appendChild(this.styles())
    }

    component() {
        const cardPrincipal = document.createElement('div');
        cardPrincipal.classList.add('card');

        // Primeira Coluna

        const firstColumn = document.createElement('div')
        firstColumn.classList.add('first-column')
        const imageCondition = document.createElement('img')
        imageCondition.classList.add('icon-image');
        imageCondition.setAttribute('src', this.icon);

        const spanCondition = document.createElement('span')
        spanCondition.textContent = this.conditionStatus

        firstColumn.appendChild(imageCondition);
        firstColumn.appendChild(spanCondition);

        // Segunda coluna

        const secondColumn = document.createElement('div')
        secondColumn.classList.add('second-column')
        const nameCity = document.createElement('h2');
        nameCity.textContent = this.cityName;

        const localDate = document.createElement('span')
        localDate.textContent = this.localData

        const temp = document.createElement('h3')
        temp.classList.add('temp-atual')
        temp.textContent = `${this.tempAtual.slice(0,2)}°C`


        const divTemps = document.createElement('div')
        divTemps.classList.add('second-column__temps')

        const divMinTemp = document.createElement('div')
        divMinTemp.classList.add('temps__min')
        const minTemp = document.createElement('span')
        minTemp.textContent = `${this.minTemp.slice(0,3)}°C`
        const imgMinTempo = document.createElement('img')
        imgMinTempo.src = '../../../../src/assets/img/minTemp.png'

        const divMaxTemp = document.createElement('div')
        divMaxTemp.classList.add('temps__max')
        const maxTemp = document.createElement('span')
        maxTemp.textContent = `${this.maxTemp.slice(0,2)}°C`
        const imgMaxTempo = document.createElement('img')
        imgMaxTempo.src = '../../../../src/assets/img/maxTemp.png'

        // Terceira coluna

        const thirdColumn = document.createElement('div')
        thirdColumn.classList.add('third-column')

        const divDetails = document.createElement('div');

        const divHumidity = document.createElement('div')
        divHumidity.classList.add('details__humidity')
        const humidityImage = document.createElement('img')
        
        humidityImage.classList.add('icon-details')
        humidityImage.src = 'https://cdn-icons-png.flaticon.com/512/1582/1582886.png'
        
        const humiditySpan = document.createElement('span')
        humiditySpan.textContent = `${this.humidity} %`

        const divWind = document.createElement('div')
        divWind.classList.add('details__wind')

        const windImage = document.createElement('img')
        windImage.classList.add('icon-details')
        windImage.src = 'https://cdn-icons-png.flaticon.com/512/172/172922.png'

        const windSpan = document.createElement('span');
        windSpan.textContent = `${this.windVelocity} km/h`;
        const iconWindDeg = document.createElement('img')
        iconWindDeg.classList.add('arrow-wind')
        iconWindDeg.src = '../../../../src/assets/img/arrowWind.png'

        divWind.appendChild(windImage)
        divWind.appendChild(windSpan);
        divWind.appendChild(iconWindDeg);
        
        divHumidity.appendChild(humidityImage)
        divHumidity.appendChild(humiditySpan);

        divDetails.appendChild(divHumidity)
        divDetails.appendChild(divWind)

        thirdColumn.appendChild(divDetails)

        divMinTemp.appendChild(imgMinTempo)
        divMinTemp.appendChild(minTemp)
        divTemps.appendChild(divMinTemp)

        divMaxTemp.appendChild(imgMaxTempo)
        divMaxTemp.appendChild(maxTemp)
        divTemps.appendChild(divMaxTemp)

        secondColumn.appendChild(nameCity);
        secondColumn.appendChild(localDate);
        secondColumn.appendChild(temp);
        secondColumn.appendChild(divTemps);

        cardPrincipal.appendChild(firstColumn);
        cardPrincipal.appendChild(secondColumn);
        cardPrincipal.appendChild(thirdColumn);

        return cardPrincipal;
    }

    attributeChangedCallback(nameAtr, oldValue, newValue) {
        if (nameAtr == 'city-name') {
            this.cityName = newValue
        }
        if (nameAtr == 'conditions-status'){
            this.conditionStatus = newValue;
        }
        if(nameAtr == 'atual-temp') this.tempAtual = newValue;
        if(nameAtr == 'min-temp') this.minTemp = newValue;
        if(nameAtr == 'max-temp') this.maxTemp = newValue;
        if(nameAtr == 'humidity') this.humidity = newValue;
        if(nameAtr == 'wind-velocity') this.windVelocity = newValue;
        if(nameAtr == 'wind-deg') this.windDeg = newValue;


        if(nameAtr == 'icon') this.icon = `http://openweathermap.org/img/wn/${newValue}@4x.png`
        
    }

    styles() {
        const style = document.createElement('style')
        style.textContent = `
        .card {
          height: 500px;
          width: 90vw;
          padding: 95px 76px;
          background: rgba( 255, 255, 255, 0.25 );
          box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
          backdrop-filter: blur( 4px );
          -webkit-backdrop-filter: blur( 4px );
          border-radius: 12px;
          border: 1px solid rgba( 255, 255, 255, 0.18 );
          display: flex;
          flex-direction: row;
        }
        
        .first-column {
          display: flex;
          flex-grow: 1;
          width: 20%;
          align-items: center; 
          justify-content: center;
          flex-direction: column;
          gap: 30px;
          font-size: 20px;
          text-transform: capitalize;
        }
        
        .second-column {
          flex-grow: 3;
          width: 60%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .second-column h2::before {
        content: url('https://cdn-icons-png.flaticon.com/32/17/17736.png');
        display: inline-block;
        position: relative;
        top: 5px;
        }

        .temp-atual {
            margin-top: 50px;
            font-size: 48px;
        }
        
        .icon-image{
          height: 150px;
          filter: drop-shadow(5px 5px 5px rgba(0,0,0,0.7));
        }

        .second-column__temps {
            margin-top: 20px;
            display:flex;
            flex-direction: row;
            align-items:center;
            justify-content:center;
            gap:10px;
        }

        .second-column__temps {
            width:30%;
            display: flex;
            justify-content: space-between;
        }

        .temps__max, .temps__min {
            display:flex;
            flex-direction: row;
            align-items:center;
            justify-content:center;
            gap:10px
        }

        .third-column {
            flex-grow: 1;
            width: 20%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap:10px;
        }

        .details__humidity, .details__wind{
            display: flex;
            justify-content:flex-start;
            align-items:center;
            gap:10px;
        }

        .icon-details {
            height: 30px;
        }

        .arrow-wind {
            transform: rotate(${this.windDeg}deg);
        }
        `

        return style;
    }
}

customElements.define('main-card', MainCard)