import { page } from './lib.js';
import { showExample } from './views/example.js';

//TODO remove after testing
import * as api from './data/request.js';
import * as userApi from './data/users.js';

page('/', showExample)

page.start();


//TODO remove after testing
window.api = api;
window.userApi = userApi;