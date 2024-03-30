import { del, get, post, put } from './request.js';

const endpoints = {
    dashboard: '/data/facts?sortBy=_createdOn%20desc',
    facts: '/data/facts',
    factById: '/data/facts/'
}

export async function getAllFacts() {
    return get(endpoints.dashboard)
}

export async function getFactById(id) {
    return get(endpoints.factById + id)
}

export async function createFact(category, imageUrl, description, moreInfo) {
    return post(endpoints.facts, {category, imageUrl, description, moreInfo})
}

export async function updateFact(id, data){
    return put(endpoints.factById + id, data)
}

export async function deleteFact(id){
    return del(endpoints.factById + id)
}