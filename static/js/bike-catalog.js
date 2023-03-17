class BikeCatalog extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    render(bikes) {
        this.shadowRoot.innerHTML = `<style>
        :host {
            display: grid;
            grid-template-columns: repeat(auto-fit, 400px);
            gap: 50px;
            justify-content: center;
            padding: 2em;
          }
        </style>`;
        bikes.forEach(bike => {
            const bikeCard = document.createElement('bike-card');
            bikeCard.bike = bike;
            this.shadowRoot.appendChild(bikeCard);
        });
    }
}

customElements.define('bike-catalog', BikeCatalog);