import { createServer } from "http";
import { Server } from "socket.io";
import { webSocket } from "./modules/socket";
import {resolve} from "path";
import dotenv from "dotenv";
dotenv.config({path: resolve(__dirname, "../.env")});

const server = createServer();
const port = process.env.PORT || 8081;

const io: Server = new Server(server, {
    cors: { origin: "*" }
});

webSocket(io);

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});
