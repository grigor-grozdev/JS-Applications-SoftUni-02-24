import { deleteMotorcycle, getMotorcycleById } from '../data/events.js';
import { html, render, page } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemp = (moto, isOwner, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${moto.imageUrl} alt="example1" />
        <p id="details-title">${moto.model}</p>
        <div id="info-wrapper">
            <div id="details-description">
                <p class="year">Year: ${moto.year}</p>
                <p class="mileage">Mileage: ${moto.mileage} km.</p>
                <p class="contact">Contact Number: ${moto.contact}</p>
                <p id = "motorcycle-description">
                    ${moto.about}
                </p>
              </div>
               <!--Edit and Delete are only for creator-->
               ${isOwner ? html`
               <div id="action-buttons">
            <a href="/edit/${moto._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete} >Delete</a>
          </div>` : null}
          
        </div>
    </div>
</section>
`;

export async function showDetails (ctx) {
    const id = ctx.params.id;
    const moto = await getMotorcycleById(id)

    const user = getUserData();
    const hasUser = !!user
    const isOwner = hasUser && user._id == moto._ownerId
    console.log(isOwner)

    render(detailsTemp(moto, isOwner, onDelete))

    async function onDelete(){
        const choice = confirm('Are you sure?')
        if(choice) {
            await deleteMotorcycle(id);
            page.redirect('/catalog');
        }
    }
}