function solve() {

    let infoSpanRef = document.querySelector("#info span");
    let departBtnRef = document.getElementById("depart");
    let arriveBtnRef = document.getElementById("arrive");

    let url = 'http://localhost:3030/jsonstore/bus/schedule/';
    //let url = 'http://localhost:3030/jsonstore/bus/b268db53-e8cd-4e1e-9d43-c7ccb41b3622/schedule/';

    let stop = {
        current: "",
        next: "depot"
    }

    async function depart() {
        try {
        let res = await fetch(url + stop.next);
        let data = await res.json();

        infoSpanRef.textContent = `Next stop ${data.name}`;
        departBtnRef.disabled = true;
        arriveBtnRef.disabled = false;

        stop.current = data.name;
        stop.next = data.next;
        } catch (err) {
            infoSpanRef.textContent = 'Error';
            departBtnRef.disabled = false;
            arriveBtnRef.disabled = false;
        }
    }

    function arrive() {
        infoSpanRef.textContent = `Arriving at ${stop.current}`;

        departBtnRef.disabled = false;
        arriveBtnRef.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();