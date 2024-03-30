import { updateFact, getFactById } from '../data/events.js';
import { html, render, page } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const editTemp = (fact, onEdit) => html`
<section id="edit">
  <div class="form">
    <h2>Edit Fact</h2>
    <form class="edit-form" @submit=${onEdit}>
      <input
        type="text"
        name="category"
        id="category"
        placeholder="Category"
        .value=${fact.category}
      />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
        .value=${fact.imageUrl}
      />
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
        .value=${fact.description}
      ></textarea>
      <textarea
        id="additional-info"
        name="additional-info"
        placeholder="Additional Info"
        rows="10"
        cols="50"
        .value=${fact.moreInfo}
      ></textarea>
      <button type="submit">Post</button>
    </form>
  </div>
</section>`;

export async function showEdit(ctx){
  const id = ctx.params.id;
  const fact = await getFactById(id);
  
  render(editTemp(fact, createSubmitHandler(onEdit)));

  async function onEdit(data, form){
    let category = data['category'];
    let imageUrl = data['image-url'];
    let description = data['description'];
    let moreInfo = data['additional-info'];
    
    if (!category || !imageUrl || !description || !moreInfo){
        return alert('All fields are required!')
    }
    await updateFact(id, {category, imageUrl, description, moreInfo});
    page.redirect('/catalog/' + id)
}

}

