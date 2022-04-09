import {createServer} from 'http';
import {Server} from 'socket.io';
import {webSocket} from "./modules/socket";
import "dotenv/config";


const server = createServer();
const port = process.env.PORT || 8081;
const io: Server = new Server(server, {
    cors: {origin: "*"}
})

webSocket(io);


server.listen(port, () => {
    console.log(`listening on *:${port}`);
});