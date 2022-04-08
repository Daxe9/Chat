import {io} from 'socket.io-client';
// @ts-ignore
const socket = io(`${window.location.hostname}:3002`);
socket.connect()
interface Message {
    timestamp: string;
    userName: string;
    message: string;
}

function generateInfo(name: string, message: string): Message {
    return {
        timestamp: new Date().toLocaleString(),
        userName: name,
        message
    };
}

// for typescript: "strictNullChecks": false
document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault()
    const input: HTMLInputElement = (<HTMLInputElement>document.getElementById("messageInput"))
    if (input) {
        const username: string = (<HTMLInputElement>document.getElementById("username")).value || "Anonymous";
        socket.emit("msg", generateInfo(username, input.value));
        input.value = ""
    }
});

socket.on("broadcastMessage", (data: Message) => {
    // new text block
    const newTextBlock = document.createElement("div");
    const userName = document.createElement("h3");
    userName.innerText = data.userName;
    const timestamp = document.createElement("p");
    timestamp.innerText = data.timestamp;
    const message = document.createElement("code");
    message.innerText = data.message;
    newTextBlock.appendChild(userName);
    newTextBlock.appendChild(timestamp);
    newTextBlock.appendChild(message);
    // add to the chat
    document.getElementById("app").appendChild(newTextBlock);
});