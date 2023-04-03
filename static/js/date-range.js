class DateRange extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    render(startDate, endDate) {
        const today = new Date();
        startDate = today > startDate ? today : startDate
        endDate = today < endDate ? endDate : today

        this.shadowRoot.innerHTML = `
            <style>
                :host > div {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    margin-top: 30%;
                }

                label {
                    display: block;
                }

                input {
                    padding: 10px;
                    border-radius: 10px;
                    font-family: 'Roboto';
                    box-shadow: 2px 2px 5px black;
                    margin: 15px;
                }

                button {
                    display: block;
                    font-size: 20px;
                    padding: 10px 20px;
                    margin: 0 auto;
                    margin-top: 30px;
                    border-radius: 5px;
                    border: none;
                    background-color: #febd69;
                    color: #232f3e;
                    font-weight: bold;
                    cursor: pointer;
                }
            </style>
            <div>
                <div>
                    <label for="startDate">Start Date</label>
                    <input required name="startDate" type="date" min="${startDate.toISOString().split('T')[0]}" max="${endDate.toISOString().split('T')[0]}"/>
                </div>
                <div>
                    <label for="endDate">End Date</label>
                    <input required name="endDate" type="date" min="${startDate.toISOString().split('T')[0]}" max="${endDate.toISOString().split('T')[0]}"/>
                </div>
            </div>
        `
        let btn = document.createElement("button");
        btn.textContent = "Reserve";
        btn.addEventListener("click", (e) => e.data = Array.prototype.reduce.call(this.shadowRoot.querySelectorAll('input'), (a, i) => ({ ...a, [i.name]: new Date(i.value)}), {}));
        this.addEventListener("click", e => e.originalTarget != btn ? e.stopPropagation(): true)
        this.shadowRoot.appendChild(btn);
    }

}

customElements.define('date-range', DateRange);
