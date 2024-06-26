export function setUserData(data){
    localStorage.setItem('user', JSON.stringify(data));
}

export function getUserData() {
    return JSON.parse(localStorage.getItem('user'));
}

export function clearUserData() {
    return localStorage.removeItem('user');
}


// TODO add custom validation
export function createSubmitHandler(callback) {
    return function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = [...formData.entries()].map(([k, v]) => [k, v.trim()]);

        callback(Object.fromEntries(data), event.target)
    };
}

export function updateNav() {
    const user = getUserData();

    document.querySelector('nav .user').style.display = user ? 'inline' : 'none';
    document.querySelector('nav .guest').style.display = user ? 'none' : 'inline';
}