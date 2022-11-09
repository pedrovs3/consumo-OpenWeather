class WeatherCard extends HTMLElement{
  constructor () {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.locationIcon = '';
    this.locationDegree = '';
    this.locationName = '';
  }

  connectedCallback() {
    this.shadow.appendChild(this.component());
    this.shadow.appendChild(this.styles());
  }

  static get observedAttributes() {
    return ['icon', 'degree', 'name'];
  }

  attributeChangedCallback(attribName, oldValue, newValue) {
    if (attribName === 'icon')
      this.locationIcon = newValue;
    if (attribName === 'degree')
      this.locationDegree = newValue;
    if (attribName === 'name')
      this.locationName = newValue;
  }


  styles() {
    const styles = document.createElement('style');
    styles.textContent = `
      .card {
        width: 15rem;
        height: 21rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgba( 255, 255, 255, 0.5 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        border-radius: 12px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
        gap: 30px;
        padding: 40px 20px;
      }

      .card-photo {
        filter: drop-shadow(0px 0px 2px #000);
      }

      .card-degree {
        font-size: 3rem;
        font-weight: bolder;
        font-family: 'Inter', sans-serif;
      }

      .card-name {
        height: 30%;
        font-size: 2rem;
        font-weight: bolder;
        font-family: 'Inter', sans-serif;
        width: 100%;
        overflow: hidden;
        text-align: center;
      }
    `;
    return styles;
  }

  component() {
    const element = document.createElement('div');
    element.classList.add('card');

    const elementIcon = document.createElement('img');
    elementIcon.src = this.locationIcon;
    elementIcon.classList.add('card-photo');

    const elementDegree = document.createElement('span');
    elementDegree.textContent = `${this.locationDegree.slice(0,2).replace('.', '')}°C`;
    elementDegree.classList.add('card-degree');

    const elementName = document.createElement('span');
    elementName.textContent = this.locationName;
    elementName.classList.add('card-name');

    element.appendChild(elementIcon);
    element.appendChild(elementDegree);
    element.appendChild(elementName);

    return element;
  }
}

customElements.define('weather-card', WeatherCard);