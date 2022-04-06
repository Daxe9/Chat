import { createServer } from "http";
import WebSocket from "ws";
const server = createServer();
const wss = new WebSocket.Server({ server });

function time() {
    return new Date().toLocaleString();
}

let clients: WebSocket[] = [];

function broadcast(msg: string) {
    clients.forEach((client) => {
        client.send(msg);
    });
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

wss.on("connection", async (ws: WebSocket) => {
    let lastMessageTimestamp: number;
    clients.push(ws);
    console.log("connected to server");
    ws.on("message", (msg: string) => {
        if (lastMessageTimestamp && Date.now() - lastMessageTimestamp < 5000) {
            return;
        }
        lastMessageTimestamp = Date.now();
        console.log("ms" + msg);
        broadcast(
            JSON.stringify({
                timestamp: time(),
                message: new String(msg),
            })
        );
    });
    await sleep(5000);
    wss.on("close", () => {
        clients.slice(clients.indexOf(ws), 1);
        console.log("disconnected from server");
    });
});

server.listen(8080);
