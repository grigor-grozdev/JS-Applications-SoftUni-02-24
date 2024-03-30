import { html, render, page } from '../lib.js';
import { createSubmitHandler } from '../util.js';
import { updateItem, getItemById } from '../data/events.js';
import { notify } from '../notification.js'

const editTemp = (item, onEdit) => html`
<section id="edit">
    <div class="form form-item">
        <h2>Edit Your Item</h2>
        <form class="edit-form" @submit=${onEdit}>
            <input type="text" name="item" id="item" placeholder="Item" .value=${item.item} />
            <input
                type="text"
                name="imageUrl"
                id="item-image"
                placeholder="Your item Image URL"
                .value=${item.imageUrl}
            />
            <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
                .value=${item.price}
            />
            <input
                type="text"
                name="availability"
                id="availability"
                placeholder="Availability Information"
                .value=${item.availability}
            />
            <input
                type="text"
                name="type"
                id="type"
                placeholder="Item Type"
                .value=${item.type}
            />
            <textarea
                id="description"
                name="description"
                placeholder="More About The Item"
                rows="10"
                cols="50"
                .value=${item.description}
            ></textarea>
            <button type="submit">Edit</button>
        </form>
    </div>
</section>`;

export async function showEdit(ctx) {
    const id = ctx.params.id;
    const item = await getItemById(id);

    render(editTemp(item, createSubmitHandler(onEdit)))


    async function onEdit({ item, imageUrl, price, availability, type, description }, form) {
        if (!item || !imageUrl || !price || !availability || !type || !description) {
            notify('All fields are required!')
            return
        }
        await updateItem(id, {item, imageUrl, price, availability, type, description});
        page.redirect('/catalog/' + id)
    }

}