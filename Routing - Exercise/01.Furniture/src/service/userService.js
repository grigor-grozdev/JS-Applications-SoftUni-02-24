import { api } from "../utility/requester.js";

const baseURL = "http://localhost:3030/";
const endpoints = {
    login: "users/login",
    register: "users/register",
    logout: "users/logout"
}

async function login(data) {
    return await api.post(baseURL + endpoints.login, data);
}

async function register(data) {
    return await api.post(baseURL + endpoints.register, data);
}

async function logout() {
    return await api.get(baseURL + endpoints.logout);
}

export const userService = {
    login,
    register,
    logout
}