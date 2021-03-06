import { createServer } from "http";
import { Server } from "socket.io";
import { webSocket } from "./modules/socket";
import { resolve } from "path";
import dotenv from "dotenv";
import { handleUncaughtExceptions } from "./helper/logger";

dotenv.config({ path: resolve(__dirname, "../.env") });

const server = createServer();
const port = process.env.PORT || 8081;
const io: Server = new Server(server, {
    cors: { origin: "*" }
});

// server
webSocket(io);

// log error for uncaught exceptions
handleUncaughtExceptions();

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});
