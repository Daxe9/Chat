import {Server, Socket} from "socket.io";
import {Message} from "../utils";
import Database from "./db";
import {resolve} from "path";
import dotenv from "dotenv";

dotenv.config({path: resolve(__dirname, "../../.env")});
const db = new Database(
    {
        user: process.env.DB_USER as string,
        port: parseInt(process.env.DB_PORT!) as number,
        database: process.env.DATABASE as string,
        password: process.env.DB_PASSWORD as string
    },
    process.env.DB_TABLE as string
);

// handle message history
async function getHistory(socket: Socket) {
    // get all message history when connected
    const messageHistory: Message[] | void = await db.getAllMessage();
    if (messageHistory) {
        socket.emit("messageHistory", messageHistory);
    }
}

// handle disconnection
function disconnection(socket: Socket) {
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
}

// handle incoming messages
function handleMessage(io: Server, socket: Socket) {
    // waiting for message and then broadcast it
    socket.on("msg", async (data: Message) => {
        // store message into db
        await db.storeMessage({
            author: data.author,
            content: data.content,
            timestamp: data.timestamp,
            to_author: data.to_author
        });
        // broadcast
        io.emit("broadcastMessage", data);
    });
}

function clearAllMessage(socket: Socket) {
    socket.on("clearAllMessage", async (name: string) => {
        await db.clearAllMessageByName(name);
    });
}



export function webSocket(io: Server) {
    io.on("connection", async (socket: Socket) => {
        await getHistory(socket);
        handleMessage(io, socket);
        clearAllMessage(socket);
        disconnection(socket);
    });
}
