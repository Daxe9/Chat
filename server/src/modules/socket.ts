import { Server, Socket } from "socket.io";
import { InMemorySessionStore } from "../helper/SessionStorage";
import { AuthSocket, Message, User } from "../helper/types";
import Database from "./db";
import { resolve } from "path";
import dotenv from "dotenv";
import * as crypto from "crypto";

dotenv.config({ path: resolve(__dirname, "../../.env") });
const sessionStore = new InMemorySessionStore();

// figure database
const db = new Database(
    {
        user: process.env.DB_USER as string,
        port: parseInt(process.env.DB_PORT!) as number,
        database: process.env.DATABASE as string,
        password: process.env.DB_PASSWORD as string
    },
    process.env.DB_TABLE as string
);

function randomID(): string {
    return crypto.randomBytes(8).toString("hex");
}

// handle message history
async function getHistory(socket: Socket): Promise<void> {
    // get all message history when connected
    const messageHistory: Message[] | void = await db.getAllMessage();
    if (messageHistory) {
        socket.emit("messageHistory", messageHistory);
    }
}

// handle disconnection
function disconnection(socket: Socket, users: User[]): void {
    socket.on("disconnect", () => {
        users.filter((user) => user.userID !== socket.id);
        console.log("A user has disconnected");
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

// private messaging
function privateMessage(socket: AuthSocket): void {
    socket.on(
        "privateMessage",
        ({ content, to }: { content: Message; to: any }) => {
            // @ts-ignore
            socket.to(to).to(socket.userID).emit("privateMessage", {
                content,
                from: socket.id
            });
        }
    );
}

// catch all received events
function catchAll(socket: Socket): void {
    socket.onAny((event: string, ...args: any[]) => {
        console.log(`event: ${event}`);
        console.log(`args: ${args}`);
    });
}

// clear message by name
function clearAllMessage(socket: Socket): void {
    socket.on("clearAllMessage", async (name: string) => {
        await db.clearAllMessageByName(name);
    });
}

// authentication through sessionID and username
function authentication(socket: AuthSocket, next: Function): void {
    const sessionID = socket.handshake.auth.sessionID;
    if (sessionID) {
        const session = sessionStore.findSession(sessionID);
        if (session) {
            socket.sessionID = sessionID;
            socket.userID = session.userID;
            socket.username = session.username;
            return next();
        }
    }

    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("Authentication error"));
    }

    socket.sessionID = randomID();
    socket.userID = randomID();

    socket.username = username;
    next();
}

// handle new user connection
function newUserConnection(socket: Socket) {
    socket.broadcast.emit("newUserConnection", {
        userID: socket.id,
        // @ts-ignore
        username: socket.username
    } as User);
}

// handler for all activities
export function webSocket(io: Server) {
    io.use(authentication);
    io.on("connection", async (socket: AuthSocket) => {
        console.log("A user connected");

        socket.emit("session", {
            sessionID: socket.sessionID,
            userID: socket.userID
        });
        // @ts-ignore
        socket.join(socket.userID);

        // handler for connections and emission of all connected users
        const users: User[] = [];
        for (let [id, socket] of io.of("/").sockets) {
            users.push({
                userID: id,
                // @ts-ignore
                username: socket.username
            } as User);
        }
        socket.emit("userList", users);

        await getHistory(socket);
        newUserConnection(socket);
        privateMessage(socket);
        handleMessage(io, socket);
        clearAllMessage(socket);
        catchAll(socket);
        disconnection(socket, users);
    });
}
