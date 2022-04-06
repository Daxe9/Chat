import WebSocket from "ws";
// server
const wss = new WebSocket.Server({
    port: 8081,
});

function time() {
    return new Date().toLocaleString();
}

wss.on("connection", (ws: WebSocket) => {
    console.log("connected to server");

    ws.on("message", (msg: string) => {
        console.log(`Client has sent: ${msg}`);
        ws.send(
            JSON.stringify({
                timestamp: time(),
                message: new String(msg),
            })
        );
    });

    wss.on("close", () => {
        console.log("disconnected from server");
    });
});
