import {io} from "socket.io-client"
import {MessageBackend} from "../types";
// import {mapActions} from "vuex";
// const actions = mapActions(["getHistory"])
// console.log(actions)
export default class SocketManager {
    private URL: string = `${window.location.hostname}:3002`
    public socket = io(this.URL);

    constructor() {
        this.socket.connect();

        // broadcast message and print on the screen
        // this.socket.on("broadcastMessage", (message: MessageBackend) => {
        //     console.log(message)
        // })
    }
    public sendMessage(message: MessageBackend) {
        this.socket.emit('msg', message);
    }
}