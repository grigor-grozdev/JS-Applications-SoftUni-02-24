const rootMsg = document.querySelector('.notification')

export function notify(msg) {
    rootMsg.style.display = "block" 
    document.querySelector(' .msg').textContent = msg;

    setTimeout(remove, 3000);

    function remove() {
        rootMsg.style.display = "none" 
    }
}