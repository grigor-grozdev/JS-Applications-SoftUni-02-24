import { deleteFact, getFactById } from '../data/events.js';
import { getLikesByFactId, isLiked, likeFact } from '../data/likes.js';
import { html, render, page } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemp = (fact, user, isOwner, likes, liked, onDelete, onLike) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src="${fact.imageUrl}" alt="example1" />
        <p id="details-category">${fact.category}</p>
        <div id="info-wrapper">
            <div id="details-description">
                <p id="description">${fact.description}</p>
                <p id ="more-info">${fact.moreInfo}</p>
            </div>
            <h3>Likes:<span id="likes">${likes}</span></h3>

            ${user ? html`
            <div id="action-buttons">
            ${isOwner ? html`
            <a href="/edit/${fact._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete} >Delete</a>
            ` : (!liked ? html`<a href="javascript:void(0)" id="like-btn" @click=${onLike} >Like</a>` : null)}            
            </div>` : null}
            
        </div>
    </div>
</section>`;

export async function showDetails(ctx){
    const id = ctx.params.id;

    const requests = [
        getFactById(id),
        getLikesByFactId(id)
    ]

    const userData = getUserData();

    if (userData){
        requests.push(isLiked(id, userData._id));
    }

    const [fact, likes, liked] = await Promise.all(requests);

    const user = !!userData;
    const isOwner = user && userData._id == fact._ownerId;

    render(detailsTemp(fact, user, isOwner, likes, liked, onDelete, onLike));

    async function onDelete() {
        const choice = confirm('Are you sure?');
        if (choice){
            await deleteFact(id)
            page.redirect('/catalog');
        }        
    }

    async function onLike(){
        await likeFact(id);
        page.redirect('/catalog/' + id)
    }
}