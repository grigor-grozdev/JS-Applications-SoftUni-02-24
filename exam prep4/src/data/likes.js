import { get, post } from './request.js';

const endpoints = {
    like: '/data/likes',
    likesByFactId: (factId) => `/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`,
    hasLiked: (factId, userId) => `/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function likeFact(factId) {
    return post(endpoints.like, { factId });
}

export async function getLikesByFactId(factId){
    return get(endpoints.likesByFactId(factId));
}

export async function isLiked(factId, userId) {
    return get(endpoints.hasLiked(factId, userId));
}