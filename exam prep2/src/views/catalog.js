import { getAllMotorcycles } from '../data/events.js';
import { html, render } from '../lib.js';

const catalogTemp = (motors) => html`
<h2>Available Motorcycles</h2>
<section id="dashboard">
  ${motors.length ? motors.map(motoTemp) : html` <h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}
</section>
`;

const motoTemp = (moto) => html`
<div class="motorcycle">
            <img src= "${moto.imageUrl}" alt="example1" />
            <h3 class="model">${moto.model}</h3>
            <p class="year">${moto.year}</p>
            <p class="mileage">Mileage: ${moto.mileage} km.</p>
            <p class="contact">Contact Number: ${moto.contact}</p>
            <a class="details-btn" href="/catalog/${moto._id}">More Info</a>
          </div>
`;

export async function showCatalog(ctx) {
    const motors = await getAllMotorcycles();
    render(catalogTemp(motors))
}