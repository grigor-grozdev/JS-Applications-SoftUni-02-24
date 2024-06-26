function attachEvents() {
    document.getElementById("refresh").addEventListener("click", onLoadMsg);
    document.getElementById("submit").addEventListener("click", onSubmit);

    //let url = "http://localhost:3030/jsonstore/messenger/656d93d8-dd39-40e9-b174-b9c55c054d8c";
    let url = "http://localhost:3030/jsonstore/messenger";

    async function onSubmit(e){
        let nameRef = document.querySelector("input[name='author']");
        let textRef = document.querySelector("input[name='content']");
        let name = nameRef.value;
        let text = textRef.value;

        let data = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({author: name, content: text})
        }

        await fetch(url, data);
        onLoadMsg();
        nameRef.value = "";
        textRef.value = "";
    }

    async function onLoadMsg(e){
        let textAreaRef = document.getElementById("messages");
        textAreaRef.value = "";
        let res = await fetch(url);
        let data = await res.json();

        Object.values(data).forEach(rec => {
            textAreaRef.value += `${rec.author}: ${rec.content}\n`
        })
        textAreaRef.value = textAreaRef.value.trim();
    }
}

attachEvents();