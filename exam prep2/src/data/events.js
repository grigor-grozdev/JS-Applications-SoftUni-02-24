import { del, get, post, put } from './request.js';

const endpoints = {
    dashboard: '/data/motorcycles?sortBy=_createdOn%20desc ',
    motorcycles: '/data/motorcycles',
    motoById: '/data/motorcycles/',
    search: (query) => `/data/motorcycles?where=model%20LIKE%20%22${query}%22`
}

export async function getAllMotorcycles() {
    return get(endpoints.dashboard)
}

export async function getMotorcycleById(id) {
    return get(endpoints.motoById + id)
}

export async function createMotorcycle(model, imageUrl, year, mileage, contact, about) {
    return post(endpoints.motorcycles, {model, imageUrl, year, mileage, contact, about})
}

export async function updateMotorcycle(id, data){
    return put(endpoints.motoById + id, data)
}

export async function deleteMotorcycle(id){
    return del(endpoints.motoById + id)
}

export async function searchMoto(query){
    return get(endpoints.search(query))
}