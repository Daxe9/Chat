import { io } from "socket.io-client";
import { MessageBackend, ContactType } from "../types";

// TODO: more astraction
class SocketManager {
    private readonly port: number = 3002;
    private URL: string = `${window.location.hostname}:${this.port}`;
    public socket = io(this.URL);
    public userList: ContactType[] = [];
    public currentContact: ContactType;
    public isConnected: boolean = false;
    public historyMessages: MessageBackend[] = [];

    /**
     * @description: connect the backend
     * */
    public async connectToBackend(): Promise<void> {
        this.socket.connect();
    }

    /**
     * @description: set username to authentication and login to backend
     * @param {string} username, username of the user
     * */
    public async login(username: string): Promise<void> {
        this.socket.auth = { username };
        await this.connectToBackend();
        // connection error
        this.socket.on("connect_error", (err: any) => {
            if (err.message === "Authentication error") {
                return new Error("Authentication error");
            } else {
                // generic error
                console.log("Could not connect to server");
            }
        });
    }
    /**
     * @description: This function is used to send a message to the backend
     * @param {MessageBackend} message
     */
    public sendMessage(message: MessageBackend): void {
        this.socket.emit("msg", message);
    }

    /**
     * @description: This function is used to clear all global chat messages by name
     * @param {string} name
     */
    public clearMessagesByName(name: string): void {
        this.socket.emit("clearAllMessage", name);
    }

    /**
     * @description: This function is used to set al connected users
     * @param {ContactType[]} userList
     * */
    public setUserList(userList: ContactType[]): void {
        this.userList = userList;
    }
}

// export only an instance of the class
export const API = new SocketManager();
