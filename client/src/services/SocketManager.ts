import { io } from "socket.io-client";
import { MessageBackend, ContactType } from "../types";
class SocketManager {
    private readonly port: number = 3002
    private URL: string = `${window.location.hostname}:${this.port}`
    // @ts-ignore
    public socket = io(this.URL);
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
    // @ts-ignore
    public currentContact: ContactType;

    public async connectToDB() {
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
export class Test {
    private readonly port: number = 3002
    private URL: string = `${window.location.hostname}:${this.port}`
    // @ts-ignore
    public socket = io(this.URL);
    constructor() {
        this.socket.connect()
    }
}
export const API = new SocketManager();