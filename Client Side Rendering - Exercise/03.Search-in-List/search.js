import {html, render} from "./node_modules/lit-html/lit-html.js"
import {towns} from "./towns.js"

let townsRoot = document.getElementById("towns");
let resultRoot = document.getElementById("result");

document.querySelector("button").addEventListener("click", search);

update(towns);

function search(e) {
   let srch = document.getElementById("searchText").value;
   let match = towns.filter(town => town.includes(srch));
   update(towns, match);
   render(html`${match.length} matches found`, resultRoot)
}

function update(towns, match) {
   let templ = (towns, match) => html`
   <ul>
      ${towns.map(town => html`<li class=${match?.includes(town)? "active": ""}>${town}</li>`)}
   </ul>
   `

   render(templ(towns, match), townsRoot)
}




