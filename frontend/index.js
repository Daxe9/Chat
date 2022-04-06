const ws = new WebSocket("ws://localhost:8081");

ws.addEventListener("open", () => {
    console.log("Connected to server");
    document.getElementById("btn").addEventListener("click", () => {
        ws.send(document.querySelector("textarea").value);
    });
    document.querySelector("textarea").value = "";
});

ws.addEventListener("message", (e) => {
    const msg = JSON.parse(e.data);
    const newTextBlock = document.createElement("div");
    const time = document.createElement("p");
    time.innerText = msg.timestamp;
    const message = document.createElement("p");
    message.innerText = msg.message;
    newTextBlock.appendChild(time);
    newTextBlock.appendChild(message);
    document.querySelector("#chat").appendChild(newTextBlock);
});
