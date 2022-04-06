import { createServer } from "http";
import WebSocket from "ws";
const server = createServer();
const wss = new WebSocket.Server({ server });

function time() {
    return new Date().toLocaleString();
}

interface Clients {
    ws: WebSocket;
    lastTimestamp: number;
}

const clients: Clients[] = [];

function broadcast(msg: string) {
    clients.forEach((client) => {
        if(Date.now() - client.lastTimestamp > 1000){
            client.ws.send(msg);
            client.lastTimestamp = Date.now();
        }
    });
}

wss.on("connection", async (ws: WebSocket) => {
    // new instance of a client
    clients.push({
        ws,
        lastTimestamp: Date.now(),
    });

    console.log("connected to server");
    ws.on("message", (msg: string) => {
        broadcast(
            JSON.stringify({
                timestamp: time(),
                message: new String(msg),
            })
        );
    });


    wss.on("close", () => {
        clients.filter(client => client.ws === ws);
        console.log("disconnected from server");
    });
});

server.listen(8080);
