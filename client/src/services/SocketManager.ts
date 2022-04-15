import { io } from "socket.io-client";
import { MessageBackend, ContactType } from "../types";
export class SocketManager {
    private readonly port = 3002
    private URL: string = `${window.location.hostname}:${this.port}`
    // @ts-ignore
    public socket;
    public userList: ContactType[] = [
        {
            userID: "1",
            username: "Davide",
            self: true
        },
        {
            userID: "2",
            username: "Giovanni",
            self: true
        },
        {
            userID: "3",
            username: "Marco",
            self: true
        },
    ];
    constructor() {}

    public connectToDB() {
        this.socket = io(this.URL);
        this.socket.connect();
    }

    public sendMessage(message: MessageBackend) {
        this.socket.emit("msg", message);
    }
    public clearMessagesByName(name: string) {
        this.socket.emit("clearAllMessage", name);
    }
    public setUserList(userList: ContactType[]) {
        this.userList = userList;
    }
}

export const API = new SocketManager();