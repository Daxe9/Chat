// TODO: add history messages handling in term of time
import {Server, Socket} from "socket.io";
import {Message} from "../utils";
import Database from "./db";
import {resolve} from "path";
import dotenv from "dotenv";

interface AuthSocket extends Socket {
    username?: string
}

interface User {
    userID: string;
    username: string;
}

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
async function getHistory(socket: Socket):Promise<void> {
    // get all message history when connected
    const messageHistory: Message[] | void = await db.getAllMessage();
    if (messageHistory) {
        socket.emit("messageHistory", messageHistory);
    }
}

// handle disconnection
function disconnection(socket: Socket): void {
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
}

// handle incoming messages
function handleMessage(io: Server, socket: Socket): void {
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

function privateMessage(socket: Socket):void {
    socket.on("privateMessage", ({content, to}: { content: Message, to: any}) => {
        console.log(content);
        socket.to(to).emit("privateMessage", {
            content,
            from: socket.id
        })
    })
}


function catchAll(socket: Socket): void {

    socket.onAny((event: string, ...args: any[]) => {
        // console.log(`event: ${event}`);
        // console.log(`args: ${args}`);
    });
}

function clearAllMessage(socket: Socket): void {
    socket.on("clearAllMessage", async (name: string) => {
        await db.clearAllMessageByName(name);
    });
}

function processUsername(socket: AuthSocket, next: Function): void {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("Authentication error"));
    }
    socket.username = username;
    next();
}


export function webSocket(io: Server) {
    io.use(processUsername);
    io.on("connection", async (socket: Socket) => {
        console.log("A user connected");
        const users: User[] = [];

        for(let [id, socket] of io.of("/").sockets) {
            users.push({
                userID: id,
                // @ts-ignore
                username: socket.username
            } as User);
        }

        socket.broadcast.emit("newUserConnection", {
            userID: socket.id,
            // @ts-ignore
            username: socket.username
        } as User);

        socket.emit("userList", users);
        await getHistory(socket);
        privateMessage(socket);
        handleMessage(io, socket);
        clearAllMessage(socket);
        catchAll(socket);
        // disconnection(socket);
        socket.on("disconnect", () => {
            users.filter(user => user.userID !== socket.id)
            console.log("A user has disconnected");
        });
    });
}
