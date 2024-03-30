import { html, render } from '../lib.js';
import { createSubmitHandler } from '../util.js';
import { searchCar } from '../data/events.js';


const searchTemp = (result, onSearch) => html`
<section id="search">
    <div class="form">
        <h4>Search</h4>
        <form class="search-form" @submit=${onSearch}>
            <input type="text" name="search" id="search-input" />
            <button class="button-list">Search</button>
        </form>
        </div>
        <div class="search-result">
        ${result.length ? result.map(resultTemp) : html`<h2 class="no-avaliable">No result.</h2>`}
    </div>
</section>
`;

const resultTemp = (car) => html`
<div class="car">
    <img src="${car.imageUrl}" alt="example1"/>
    <h3 class="model">${car.model}</h3>
    <a class="details-btn" href="/catalog/${car._id}">More Info</a>
</div >
`;

export async function showSearch(result) {
    render(searchTemp(result, createSubmitHandler(onSearch)))
}

async function onSearch({ search }, form) {
    if (!search) {
        return alert('Field must be filled!')
    }
    const result = await searchCar(search);
    showSearch(result)
}