class StoresList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set stores(stores) {
        this.render(stores);
    }

    render(stores) {
        stores.forEach((store, i) => {
            i > 0 ? this.shadowRoot.appendChild(document.createElement("hr")) : false;
            let dl = document.createElement("dl");
            dl.innerHTML += `
                <style>
                    dl {
                        display: grid;
                        grid-template-columns: 40% 15% 15% 15% 15%;
                        align-items: center;
                        margin: 0;
                        padding: 5% 0;
                        transition: text-shadow 0.2s ease-out;
                    }

                    dt:first-of-type {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    dd {
                        margin: 0;
                    }

                    dl:hover {
                        text-shadow: 2px 2px 2px #999;
                    }
                </style>
                <dt>
                    ${store.name}
                    <a href="https://www.google.com/maps/search/?api=1&query=${store.geoloc.replace(' ', '')}" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    </a>
                </dt>
                <dt>Inventory:</dt><dd>${store.inventory}</dd>
                <dt>Price:</dt><dd>${store.price}</dd>
            </dl>
            `;
            dl.addEventListener('click', (e) => e.data = store)
            this.shadowRoot.appendChild(dl);
        })
    }
}

customElements.define('stores-list', StoresList);
