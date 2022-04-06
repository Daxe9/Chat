const url = `ws://${window.location.hostname}:8081`;
const ws = new WebSocket(url);
console.log(url);
interface Message {
    timestamp: string;
    message: string;
}

ws.addEventListener("open", () => {
    console.log("Connected to server");
    document.getElementById("btn").addEventListener("click", () => {
        ws.send(document.querySelector("textarea").value);
    });
    document.querySelector("textarea").value = "";
});

// HTTP Authentication failed; no valid credentials available when use web sockets

ws.addEventListener("message", (e) => {
    const msg: Message = JSON.parse(e.data);
    console.log(msg);
    const newTextBlock: HTMLElement = document.createElement("div");
    const time: HTMLElement = document.createElement("p");
    time.innerText = msg.timestamp;
    const message: HTMLElement = document.createElement("p");
    message.innerText = msg.message;
    newTextBlock.appendChild(time);
    newTextBlock.appendChild(message);
    document.querySelector("#chat").appendChild(newTextBlock);
});
