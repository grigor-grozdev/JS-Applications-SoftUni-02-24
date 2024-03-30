
import { page } from './lib.js';
import { updateNav } from './util.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showLogin } from './views/login.js';
import { showLogout } from './views/logout.js';
import { showRegister } from './views/register.js';
import { showSearch } from './views/search.js';
import { showHome } from './views/showHome.js';

updateNav();

page('/', showHome);
page('/catalog', showCatalog);
page('/login', showLogin);
page('/register', showRegister);
page('/logout', showLogout);
page('/create', showCreate);
page('/catalog/:id', showDetails);
page('/edit/:id', showEdit);
page('/search', showSearch);

page.start();


