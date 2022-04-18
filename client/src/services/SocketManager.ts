import { io } from "socket.io-client";
import { MessageBackend, ContactType } from "../types";

// TODO: more astraction
class SocketManager {
    private readonly port: number = 3002
    private URL: string = `${window.location.hostname}:${this.port}`
    public socket = io(this.URL);
    public userList: ContactType[] = [];
    public currentContact: ContactType;
    public isConnected: boolean = false;
    public async connectToDB() {
       this.socket.connect();
    }

    /**
     * @description: This function is used to send a message to the backend
     * @param {MessageBackend} message
     */
    public sendMessage(message: MessageBackend) {
        this.socket.emit("msg", message);
    }

    /**
     * @description: This function is used to clear all global chat messages by name
     * @param {string} name
     */
    public clearMessagesByName(name: string) {
        this.socket.emit("clearAllMessage", name);
    }

    /**
     * @description: This function is used to set al connected users
     * @param {ContactType[]} userList
     * */
    public setUserList(userList: ContactType[]) {
        this.userList = userList;
    }
}

// export only an instance of the class
export const API = new SocketManager();