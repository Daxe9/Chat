import { io } from "socket.io-client";
import { MessageBackend } from "../types";

export default class SocketManager {
    private URL: string = `${window.location.hostname}:3002`;
    public socket = io(this.URL);

    constructor() {
        this.socket.connect();
    }
    public sendMessage(message: MessageBackend) {
        this.socket.emit("msg", message);
    }
}
