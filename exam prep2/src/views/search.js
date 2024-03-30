import { searchMoto } from '../data/events.js';
import { html, render, page } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const searchTemp = (onSearch, motors) => html`
<section id="search">
<div class="form">
  <h4>Search</h4>
  <form class="search-form" @submit=${onSearch} >
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>
${motors.length ? motors.map(resultTemp) : html`<h2 class="no-avaliable">No result.</h2>`}    
  <div class="search-result">
  </div>
</section>
`;

/*

<h2 class="no-avaliable">No result.</h2>
  <!--If there are matches display a div with information about every motorcycle-->
 <div class="motorcycle">
  <img src="./images/Honda Hornet.png" alt="example1" />
  <h3 class="model">Honda Hornet</h3>
    <a class="details-btn" href="">More Info</a>
</div>*/

const resultTemp = (moto) => html`
<div class="motorcycle">
  <img src="${moto.imageUrl}" alt="example1" />
  <h3 class="model">${moto.model}</h3>
    <a class="details-btn" href="/catalog/${moto._id}">More Info</a>
</div>
`;

export async function showSearch(motors){
    render(searchTemp(createSubmitHandler(onSearch), motors));    
}

async function onSearch(data, form) {
    const query = data.search;
    if(!query){
        return alert('Field must be filled!')
    }
    const motors = await searchMoto(query)
    render(searchTemp(createSubmitHandler(onSearch), motors));
    }