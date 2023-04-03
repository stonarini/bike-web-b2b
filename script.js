import { Store, dispatcher } from './static/js/store.js';

const bikeServiceHub = "https://bikes.stonarini.dev"

const bikeStore = new Store("bikes");

bikeStore.on("searchbikes", async function() {
    try {
        const response = await fetch(`${bikeServiceHub}/bikes/catalog`);
        this.set(await response.json());
    } catch (error) {
        console.error(error);
    }
})

bikeStore.on("filterbikes", async function(e) {
    try {
        const response = await fetch(`${bikeServiceHub}/bikes/filter`, {
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

bikeStore.on("reservebike", async function (e) {
    try {
        const response = await fetch(`${bikeServiceHub}/bike/rent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e.detail)
        });
        dispatcher.dispatchEvent(new CustomEvent("reserveresponse", { detail: await response.json() }));
    } catch (error) {
        console.error(error);
    }

})

bikeStore.addChangeListener(...document.querySelectorAll('bike-catalog'))

dispatcher.dispatchEvent(new CustomEvent('searchbikes'));

document.querySelector(".search-bar button").addEventListener("click", function () {
    let searchInput = document.querySelector(".search-bar input");
    dispatcher.dispatchEvent(searchInput.value ?
        new CustomEvent('filterbikes', { detail: searchInput.value }):
        new CustomEvent('searchbikes'));
    searchInput.value = ""
})

dispatcher.addEventListener("reserveresponse", function (e) {
    let color = e.detail.error ? "#ff8383" : "#8cdd8c";
    let res = e.detail.error ? e.detail.error : e.detail.message;

    let banner = document.createElement("div");
    banner.classList.add("banner");
    banner.style.backgroundColor = color;
    banner.innerHTML = `<h3>${res}</h3>`

    document.querySelector("main").prepend(banner);
    setTimeout(() => document.querySelector(".banner").remove(), 5000)
})

window.onerror = () => {
    document.dispatchEvent(new Event("click"));
}
