import { showRegisterView } from "./register.js";
import { showHome } from "./home.js"
import { getUserData } from "./userHelper.js";
import { showLogin } from "./login.js";
import { showLogout } from "./logout.js";

document.querySelectorAll("section").forEach(section => section.style.display = "none");
document.querySelector("nav").addEventListener("click", onNavigate);

const userMsg = document.getElementById("welcome-msg")
const userNav = document.querySelectorAll("li.user");
const guestNav = document.querySelectorAll("li.guest");


const routes = {
    "/register": showRegisterView,
    "/home": showHome,
    "/login": showLogin,
    "/logout": showLogout
}

function onNavigate(e) {
    e.preventDefault();

    if (e.target.tagName != "A" || !e.target.href) {
        return;
    }
    const url = new URL(e.target.href);
    const path = url.pathname;

    routes[path]();
}

export function updateNav() {
    const userData = getUserData();
    if (userData) {
        userNav.forEach(li => {
            li.style.display = "block";
        })
        guestNav.forEach(li => {
            li.style.display = "none";
        })
        
        userMsg.textContent = `Welcome, ${userData.email}`
    } else {
        userNav.forEach(li => {
            li.style.display = "none";
        })
        guestNav.forEach(li => {
            li.style.display = "block";
        })
        userMsg.textContent = ""
    }
}

updateNav();
