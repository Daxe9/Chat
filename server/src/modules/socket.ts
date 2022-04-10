import {Server, Socket} from "socket.io";
import {Message} from "../types";
import Database from "./db";
import "dotenv/config"


const db = new Database({
    user: process.env.DB_USER as string,
    port: parseInt(process.env.DB_PORT!) as number,
    database: process.env.DATABASE as string,
    password: process.env.DB_PASSWORD as string
}, process.env.DB_TABLE as string)

export function webSocket(io: Server) {
    io.on("connection", async (socket: Socket) => {
        console.log("A user connected");
        // get all message history when connected
        const messageHistory: Message[] = await db.getAllMessage();
        if(messageHistory){
            socket.emit("messageHistory", messageHistory)
        }

        // waiting for message and then broadcast it
        socket.on("msg", async (data: Message) => {
            // store message into db
            await db.storeMessage({
                author: data.author,
                content: data.content,
                timestamp: data.timestamp,
                to_author: data.to_author
            })

            // broadcast
            io.emit('broadcastMessage', data)
        })
    });
}