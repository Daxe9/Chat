import {Server, Socket} from "socket.io";
import {Message} from "../types";


export function webSocket(io: Server) {
    io.on("connection", (socket: Socket) => {

        socket.on("msg", (data: Message) => {
            io.emit('broadcastMessage', data)
        })
    });
}