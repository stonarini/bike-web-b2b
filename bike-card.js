class BikeCard extends HTMLElement {
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
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          padding: 20px;
          text-align: center;
          transition: transform 0.2s ease-in-out;
        }
      
        :host(:hover) {
          transform: translateY(-10px);
        }
      
        h2 {
          font-size: 24px;
          margin-bottom: 10px;
        }
      
        p {
          font-size: 16px;
          margin-bottom: 5px;
        }
      
        img {
          display: block;
          margin: 0 auto;
          max-width: 100%;
        }
      
        button {
          background-color: #4caf50;
          border: none;
          border-radius: 5px;
          color: white;
          cursor: pointer;
          font-size: 16px;
          margin-top: 10px;
          padding: 10px 20px;
          transition: background-color 0.2s ease-in-out;
        }
      
        button:hover {
          background-color: #388e3c;
        }
        </style>
        <div class="bike-card">
          <h2>${bike.name} (${bike.brand})</h2>
          <p>Category: ${bike.category}</p>
          <p>Weight: ${bike.weight}</p>
          <p>Frame Material: ${bike.frame}</p>
          <p>Fork Brand: ${bike.fork}</p>
          <p>Wheels Material: ${bike.wheels}</p>
          <p>Price: ${bike.price}</p>
          <p>Available Wheel Sizes: ${bike.wheelsize.join(', ')}</p>
          <p>Brakes: ${bike.brakes}</p>
          <p>Available Groupsets: ${bike.groupset.join(', ')}</p>
          <p>Drivetrain: ${bike.drivetrain}</p>
          <p>Suspension Type: ${bike.suspension}</p>
          <p>Suspension Travel (Front/Rear): ${bike.travel.front}/${bike.travel.rear}</p>
          <p>Year of Creation: ${bike.year}</p>
        </div>
      `;
    }
}

customElements.define('bike-card', BikeCard);