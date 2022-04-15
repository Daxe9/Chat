<template>
    <div>
        <FormInput @userMessage="sendMessage"/>

        <TextBlock
            v-for="(message, i) in messages"
            :key="i"
            :author="message.author"
            :content="message.content"
            :timestamp="message.timestamp"
        />
    </div>
</template>

<script lang="ts" setup>
import TextBlock from "./TextBlock.vue";
import FormInput from "./FormInput.vue";
import {MessageBackend, ContactType} from "../types";
import {onUnmounted, ref} from "vue";
import {API} from "../services/SocketManager";
import {useStore} from "vuex";
import UserState from "../components/UserState.vue";

const store = useStore();
const messages = ref<MessageBackend[]>([]);
const username = store.state.username;
const userList = ref<ContactType[]>([])
API.socket.auth = {username};
API.connectToDB();
listenToEvents();

interface User {
    userID: string;
    username: string;
    self?: boolean
}

API.socket.on("userList", (users: ContactType[]) => {
    users.forEach((user) => {
        user.self = user.userID === API.socket.id;
    });
    // put the current user first, and then sort by username
    users = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
    });
    console.log(users)
    userList.value = users;
});
API.socket.on("newUserConnection", (user: ContactType) => {
    userList.value.push(user)
    console.log(userList.value)
});


onUnmounted(() => {
    API.socket.off("connect_error")
});


function sendMessage(msg: MessageBackend): void {
    msg.timestamp = new Date().toLocaleString();
    API.sendMessage(msg as MessageBackend);
}

function listenToEvents() {
    API.socket.on("connect_error", (err: any) => {
        if (err.message === "Authentication error") {
            store.dispatch("logout");
        } else {
            // generic error
            console.log("Could not connect to server");
        }
    });
    API.socket.once("messageHistory", (msgs: MessageBackend[]) => {
        messages.value = msgs;
    });
    API.socket.on("broadcastMessage", (message: MessageBackend) => {
        messages.value.push(message);
    });


    API.socket.emit("emitPrivateMessage", {

    })
}



</script>

<style scoped>
.user-list {
    display: flex;
    flex-direction: column;
}

</style>
