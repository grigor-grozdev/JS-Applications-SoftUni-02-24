import { createFact } from '../data/events.js';
import { html, render, page } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const createTemp = (onCreate) => html`
<section id="create">
<div class="form">
  <h2>Add Fact</h2>
  <form class="create-form" @submit=${onCreate}>
    <input
      type="text"
      name="category"
      id="category"
      placeholder="Category"
    />
    <input
      type="text"
      name="image-url"
      id="image-url"
      placeholder="Image URL"
    />
    <textarea
    id="description"
    name="description"
    placeholder="Description"
    rows="10"
    cols="50"
  ></textarea>
  <textarea
    id="additional-info"
    name="additional-info"
    placeholder="Additional Info"
    rows="10"
    cols="50"
  ></textarea>
    <button type="submit">Add Fact</button>
  </form>
</div>
</section>`;

export async function showCreate(ctx){
    render(createTemp(createSubmitHandler(onCreate)))
}

async function onCreate(data, form){
    let category = data['category'];
    let imageUrl = data['image-url'];
    let description = data['description'];
    let moreInfo = data['additional-info'];
    
    if (!category || !imageUrl || !description || !moreInfo){
        return alert('All fields are required!')
    }
    await createFact(category, imageUrl, description, moreInfo);
    page.redirect('/catalog')
}