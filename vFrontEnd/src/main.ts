// replace the url with static ip address
// advised by rizzotti

const url = `ws://${window.location.hostname}:8080`;
const ws = new WebSocket(url);
interface Message {
    timestamp: string;
    message: string;
}

ws.addEventListener("open", () => {
    console.log("Connected to server");
    document.getElementById("text-field").addEventListener("keypress", (e) => {
        if(e.key === "Enter"){
            // @ts-ignore
            ws.send(document.getElementById("text-field").value);
            // @ts-ignore
            document.getElementById("text-field").value = "";
        }
    });
});

// HTTP Authentication failed; no valid credentials available when use web sockets

ws.addEventListener("message", (e) => {
    // decode msg from json string form
    const msg: Message = JSON.parse(e.data);

    // create text block from an object
    const newTextBlock: HTMLElement = document.createElement("div");
    const time: HTMLElement = document.createElement("p");
    time.innerText = msg.timestamp;
    const message: HTMLElement = document.createElement("p");
    message.innerText = msg.message;

    // append new text block in the page
    newTextBlock.appendChild(time);
    newTextBlock.appendChild(message);
    document.querySelector("#chat").appendChild(newTextBlock);
});
