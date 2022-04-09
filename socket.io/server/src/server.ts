import {createServer} from 'http';
import { Server, Socket } from 'socket.io';

const server = createServer();
const port = process.env.PORT || 3002;
const io = new Server(server,{
  cors: { origin: "*" }
})
const clients: Socket[] = []

interface Message {
  timestamp: string;
  userName: string;
  message: string;
}

function broadcastMessage(message: Message): void {
  clients.forEach(client => {
    client.emit('broadcastMessage', message)
  })
}

io.on("connection", (socket: Socket) => {
  clients.push(socket)
  console.log("connected")

  socket.on("msg", (data: Message) =>{
    io.emit('broadcastMessage', data)
  })
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});