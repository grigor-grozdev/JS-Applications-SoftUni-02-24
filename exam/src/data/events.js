import { del, get, post, put } from './request.js';

const endpoints = {
    dashboard: '/data/cyberpunk?sortBy=_createdOn%20desc',
    items: '/data/cyberpunk',
    itemById: '/data/cyberpunk/'
}

export async function getAllItems() {
    return get(endpoints.dashboard)
}

export async function getItemById(id) {
    return get(endpoints.itemById + id)
}

export async function createItem(item, imageUrl, price, availability, type, description) {
    return post(endpoints.items, {item, imageUrl, price, availability, type, description})
}

export async function updateItem(id, data){
    return put(endpoints.itemById + id, data)
}

export async function deleteItem(id){
    return del(endpoints.itemById + id)
}
