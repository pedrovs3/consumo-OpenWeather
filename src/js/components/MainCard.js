const timeElapsed = Date.now()
const today = new Date(timeElapsed)

class MainCard extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.cityName = 'City Name';
        this.icon = 'https://cdn-icons-png.flaticon.com/512/3104/3104619.png';
        this.conditionStatus = 'Chuva';
        this.minTemp = '';
        this.maxTemp = '';
        this.humidity = '';
        this.windVelocity = '';
        this.localData = `${today.toDateString()}, ${today.toTimeString().slice(0, 5)}h`;
    }

    static get observedAttributes() {
        return ['city-name', 'icon', 'conditions-status']
    }

    connectedCallback() {
        this.shadow.appendChild(this.component())
        this.shadow.appendChild(this.styles())
    }

    component() {
        const cardPrincipal = document.createElement('div');
        cardPrincipal.classList.add('card');

        const firstColumn = document.createElement('div')
        firstColumn.classList.add('first-column')
        const imageCondition = document.createElement('img')
        imageCondition.classList.add('icon-image');
        imageCondition.setAttribute('src', this.icon);

        const spanCondition = document.createElement('span')
        spanCondition.textContent = this.conditionStatus

        firstColumn.appendChild(imageCondition);
        firstColumn.appendChild(spanCondition);

        const secondColumn = document.createElement('div')
        secondColumn.classList.add('second-column')
        const nameCity = document.createElement('h2');
        nameCity.textContent = this.cityName;

        const localDate = document.createElement('span')
        localDate.textContent = this.localData

        secondColumn.appendChild(nameCity);
        secondColumn.appendChild(localDate);

        cardPrincipal.appendChild(firstColumn);
        cardPrincipal.appendChild(secondColumn);

        return cardPrincipal;
    }

    attributeChangedCallback(nameAtr, oldValue, newValue) {
        // this[nameAtr] = newValue

        if (nameAtr == 'city-name') {
            this.cityName = newValue
        }
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
        
        .icon-image{
          height: 150px;
        }
        `

        return style;
    }
}

customElements.define('main-card', MainCard)