import { render, html } from "./node_modules/lit-html/lit-html.js"

document.querySelector("form").addEventListener("submit", onSubmit);
let root = document.getElementById("root");

function onSubmit(e) {
    e.preventDefault();

    let data = new FormData(e.target);
    let towns = data.get("towns").split(', ');
    
    let temp = (towns) => html `
    <ul>
        ${towns.map((town) => html `<li>${town}</li>`)} 
    </ul>
    `

    render (temp(towns), root)
}