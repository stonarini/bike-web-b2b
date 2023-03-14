import { Store, dispatcher } from './store.js';

const bikeStore = new Store("bikes");

bikeStore.on("searchbikes", async function() {
    try {
        const response = await fetch('http://localhost:3000/bikes/catalog');
        this.set(await response.json());
    } catch (error) {
        console.error(error);
    }
})

bikeStore.on("filterbikes", async function(e) {
    try {
        const response = await fetch(`http://localhost:3000/bikes/filter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: e.detail })
        });
        this.set(await response.json());
    } catch (error) {
        console.error(error);
    }
})

const searchInput = document.querySelector('search-box');
searchInput.addEventListener('search', (e) => {
    dispatcher.dispatchEvent(
        e.detail ? 
        new CustomEvent("filterbikes", { detail: e.detail }) :
        new CustomEvent("searchbikes"));
});

bikeStore.addChangeListener(document.querySelector('bike-catalog'))

dispatcher.dispatchEvent(new CustomEvent('searchbikes'));