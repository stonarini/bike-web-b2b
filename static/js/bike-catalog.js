class BikeCatalog extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    render(bikes) {
        this.shadowRoot.innerHTML = `<style>
        :host {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 50px;
            justify-content: center;
            padding: 2em;
        }

        @media only screen and (max-width: 1500px) {
            :host {
                grid-template-columns: 1fr;
            }
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
