import {html, render} from "./node_modules/lit-html/lit-html.js"

let root = document.getElementById("menu");
//let url = "http://localhost:3030/jsonstore/advanced/e68dc777-e8c3-4e91-904b-72862e631425/dropdown"
let url = "http://localhost:3030/jsonstore/advanced/dropdown"

document.querySelector("form").addEventListener("submit", addItem)

onLoad()
async function onLoad() {

    let res = await fetch(url);
    let data = await res.json();

    let option = Object.values(data).map(op => optionTemp(op));
    update(option);
}

function optionTemp(data){
    return html`<option value=${data._id}>${data.text}</option>`
}

function update(data) {

    render(data ,root)

}

function addItem(e) {
    e.preventDefault();
    let inputRef = document.getElementById("itemText")
    let text = inputRef.value;
    inputRef.value = ""

    addItemInDb({text})
}

async function addItemInDb(data){
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    onLoad()
}