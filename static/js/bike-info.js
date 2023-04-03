class BikeInfo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set bike(bike) {
        this.render(bike);
    }

    render(bike) {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            dd > dl {
                display: grid;
                grid-template-columns: 1fr 1fr;
                column-gap: 40px;
                row-gap: 10px;
                margin-top: 15px;
            }

            :host > dl > dt{
                text-align: center;
            }

            img {
                height: 200px;
                margin-bottom: 20px;
            }

            h3 {
                margin: 0;
                text-align: center;
            }

             dt {
                font-weight: bold;
                text-align: right;
            }

            dd {
                text-align: left;
                margin: 0;
            }
        </style>
        <dl>
            <dt><img src="${bike.img}" alt="${bike.name}"/></dt>
            <dd>
                <h3>${bike.name}</h3>
                <dl>
                    <dt>Brand:</dt><dd>${bike.brand}</dd>
                    <dt>Year:</dt><dd>${bike.year}</dd>
                    <dt>Category:</dt><dd>${bike.category}</dd>
                    <dt>Weight:</dt><dd>${bike.weight}</dd>
                    <dt>Frame Material:</dt><dd>${bike.frame}</dd>
                    <dt>Fork Brand:</dt><dd>${bike.fork}</dd>
                    <dt>Brakes:</dt><dd>${bike.brakes}</dd>
                    <dt>Drivetrain:</dt><dd>${bike.drivetrain}</dd>
                    <dt>Price:</dt><dd>${bike.price}</dd>
                    <dt>Available Groupsets:</dt><dd>${bike.groupset.join(', ')}</dd>
                    <dt>Wheels Material:</dt><dd>${bike.wheels}</dd>
                    <dt>Available Wheel Size:</dt><dd>${bike.wheelsize.join(', ')}</dd>
                    <dt>Suspension Type:</dt><dd>${bike.suspension}</dd>
                    <dt>Suspension Travel (Front/Rear):</dt><dd>${bike.travel.front}/${bike.travel.rear}</dd>
                </dl>
            </dd>
        </dl>`;
    }
}

customElements.define('bike-info', BikeInfo);
