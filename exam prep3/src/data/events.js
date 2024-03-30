import { del, get, post, put } from './request.js';

const endpoints = {
    dashboard: '/data/cars?sortBy=_createdOn%20desc',
    cars: '/data/cars',
    carById: '/data/cars/',
    search: (query) => `/data/cars?where=model%20LIKE%20%22${query}%22`
}

export async function getAllCars() {
    return get(endpoints.dashboard)
}

export async function getCarById(id) {
    return get(endpoints.carById + id)
}

export async function createCar(model, imageUrl, price, weight, speed, about) {
    return post(endpoints.cars, {model, imageUrl, price, weight, speed, about})
}

export async function updateCar(id, data){
    return put(endpoints.carById + id, data)
}

export async function deleteCar(id){
    return del(endpoints.carById + id)
}

export async function searchCar(query){
    return get(endpoints.search(query))
}