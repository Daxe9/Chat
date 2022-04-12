import { io } from "socket.io-client";
import { MessageBackend } from "../types";

export default class SocketManager {
    private readonly port = 3002
    private URL: string = `${window.location.hostname}:${this.port}`
    public socket = io(this.URL);

    constructor() {
        this.socket.connect();
    }
    public sendMessage(message: MessageBackend) {
        this.socket.emit("msg", message);
    }
    public clearMessagesByName(name: string) {
        this.socket.emit("clearAllMessage", name);
    }
}
