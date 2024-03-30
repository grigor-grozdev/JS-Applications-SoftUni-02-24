import { html, render } from '../lib.js';
import { createSubmitHandler } from '../util.js';
import { page } from '../lib.js';
import { getMotorcycleById, updateMotorcycle } from '../data/events.js';

const editTemp = (moto, onEdit) => html`
<section id="edit">
    <h2>Edit Motorcycle</h2>
    <div class="form">
        <h2>Edit Motorcycle</h2>
        <form class="edit-form" @submit=${onEdit} >
            <input
                type="text"
                name="model"
                id="model"
                placeholder="Model"
                .value=${moto.model} 
            />
            <input
                type="text"
                name="imageUrl"
                id="moto-image"
                placeholder="Moto Image"
                .value=${moto.imageUrl}
            />
            <input
                type="number"
                name="year"
                id="year"
                placeholder="Year"
                .value=${moto.year} 
            />
            <input
              type="number"
              name="mileage"
              id="mileage"
              placeholder="mileage"
              .value=${moto.mileage} 
            />
            <input
              type="number"
              name="contact"
              id="contact"
              placeholder="contact"
              .value=${moto.contact} 
            />
              <textarea
                id="about"
                name="about"
                placeholder="about"
                rows="10"
                cols="50"
                .value=${moto.about} 
              ></textarea>
            <button type="submit">Edit Motorcycle</button>
        </form>
    </div>
</section>
`;

export async function showEdit(ctx) {
    const id = ctx.params.id
    const moto = await getMotorcycleById(id)
    render(editTemp(moto, createSubmitHandler(onEdit)));

    async function onEdit({
        model,
        imageUrl,
        year,
        mileage,
        contact,
        about
    }, form) {
        if (!model || !imageUrl || !year || !mileage || !contact || !about) {
            return alert('All fields are required!')
        }

        await updateMotorcycle(id, { model, imageUrl, year, mileage, contact, about });
        page.redirect('/catalog/' + id)
    }

};