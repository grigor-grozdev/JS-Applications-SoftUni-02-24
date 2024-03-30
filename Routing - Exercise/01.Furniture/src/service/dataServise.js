import { api } from "../utility/requester.js"

const baseURL = "http://localhost:3030/data";
const endpoints = {
    myFurniture: (userId) => `/catalog?where=_ownerId%3D%22${userId}%22`,
    furniture: "/catalog"
}

async function createFurniture(data) {
    return await api.post(baseURL + endpoints.furniture, data);
}

async function getAllFurniture() {
    return await api.get(baseURL + endpoints.furniture);
}

async function getFurnitureDetails(id) {
    return await api.get(baseURL + endpoints.furniture + `/${id}`);
}

async function delFurniture(id) {
    return await api.del(baseURL + endpoints.furniture + `/${id}`);
}

async function getMyFurniture(userId) {
    return await api.get(baseURL + endpoints.myFurniture(userId));
}

async function updateFurniture(id, data) {
    return await api.put(baseURL + endpoints.furniture + `/${id}`, data);
}

export const dataServise = {
    createFurniture,
    getAllFurniture,
    getFurnitureDetails,
    delFurniture,
    getMyFurniture,
    updateFurniture
}
