const urlParams = new URLSearchParams(window.location.search);
const params = {};
for (const [key, value] of urlParams) {
    params[key] = value;
}

const req = {
    name: params.bike,
    category: params.type,
    brand: params.manufacturer
}

fetch("http://localhost:3000/bikes/filter", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
})
    .then(response => response.json())
    .then(res => {
        const section = document.querySelector("#featured");
        res.forEach(b => {

            const { _id, name, stores, ...bike } = b
            const bikeButton = document.createElement('button');
            bikeButton.setAttribute('class', 'product');
            bikeButton.addEventListener('click', function () {
                const storeList = document.querySelector('dialog');
                const storeListItems = document.getElementById('storeListItems');

                storeListItems.innerHTML = '';

                stores.forEach(function (s) {
                    const listItem = document.createElement('li');
                    const { name, ...store } = s
                    const h3 = document.createElement('h3');
                    h3.textContent = name;
                    listItem.appendChild(h3);

                    for (const [key, value] of Object.entries(store)) {
                        const p = document.createElement('p');
                        const strong = document.createElement('strong');
                        strong.style.textTransform = 'capitalize'
                        strong.textContent = key;
                        p.appendChild(strong);
                        p.appendChild(document.createTextNode(': ' + value));
                        listItem.appendChild(p);
                    }
                    storeListItems.appendChild(listItem);
                });

                storeList.showModal();
                document.querySelector('#closeButton').addEventListener('click', () => storeList.close(), { once: true });
            });


            const img = document.createElement('img');
            img.setAttribute('src', 'https://via.placeholder.com/250x250.png');
            img.setAttribute('alt', name);
            bikeButton.appendChild(img);

            const h3 = document.createElement('h3');
            h3.textContent = name;
            bikeButton.appendChild(h3);

            for (const [key, value] of Object.entries(bike)) {
                const p = document.createElement('p');
                const strong = document.createElement('strong');
                strong.style.textTransform = 'capitalize'
                strong.textContent = key;
                p.appendChild(strong);
                p.appendChild(document.createTextNode(': ' + value));
                bikeButton.appendChild(p);
            }

            section.appendChild(bikeButton);
        })

    })