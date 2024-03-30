import { logout } from '../data/users.js';
import { page } from '../lib.js'
import { updateNav } from '../util.js';

export async function showLogout() {
    logout();
    updateNav();
    page.redirect('/')
}