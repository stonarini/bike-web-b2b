import { dispatcher } from "./store.js";

class BikeCard extends HTMLElement {
    #cardState;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.addEventListener('click', (e) => e.stopPropagation() || this.#cardState.next(e.data));
    }

    set bike(bike) {
        this.render(bike);
    }

    render(bike) {
        this.#cardState = this.#initCardState(bike)
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                margin: 0 20px;
                border: 1px solid #ccc;
                border-radius: 10px;
                padding: 20px;
                text-align: center;
                background-color: white;
                transition: box-shadow 0.2s ease-out;
            }
            :host(:hover) {
                cursor: pointer;
                box-shadow: 5px 5px 10px gray;
            }
        </style>`;
        this.#cardState.next()
    }

    *#initCardState(bike) {
        let bikeInfo = document.createElement("bike-info");
        bikeInfo.bike = bike;
        this.shadowRoot.appendChild(bikeInfo);

        yield;
        document.dispatchEvent(new Event('click'))
        document.addEventListener('click', () => this.bike = bike, { once: true });
        let storesList = document.createElement("stores-list");
        storesList.stores = bike.stores;
        this.shadowRoot.replaceChild(storesList, bikeInfo);

        let store = yield;
        let dateRange = document.createElement("date-range");
        dateRange.render(new Date(store.availability.from), new Date(store.availability.to))
        this.shadowRoot.replaceChild(dateRange, storesList)

        let dates = yield
        dispatcher.dispatchEvent(new CustomEvent("reservebike", { detail: {
            startDate: dates.startDate,
            endDate: dates.endDate,
            bike_id: bike._id,
            store_id: store._id
        }}));
        document.dispatchEvent(new Event('click'))
    }
}

customElements.define('bike-card', BikeCard);
