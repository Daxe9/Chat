import {io} from "socket.io-client"


export interface Message {
    author_id?: number
    author: string,
    content: string,
    to_author: string
}

export default class SocketManager {
    private URL: string = `${window.location.hostname}:3002`
    private socket = io(this.URL);

    constructor() {
        this.socket.connect();
    }
    public sendMessage(message: Message) {
        this.socket.emit('msg', message);
    }
}