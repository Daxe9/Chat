<template>
    <div id="home" v-if="isConnected">
        <SideBar id="side-bar" :contacts="contacts"/>
        <GlobalChat id="global-chat" :allMessages="allMessages"/>
    </div>
</template>

<script lang="ts" setup>
import SideBar from "../components/SideBar.vue";
import GlobalChat from "./GlobalChat.vue";
import { useStore } from "vuex";
import { API } from "../services/SocketManager";
import {ContactType, MessageBackend} from "../types";
import { ref, onMounted } from "vue";

const store = useStore();
const isConnected = ref<boolean>(API.isConnected);
const username = store.state.username;
const contacts= ref<ContactType[]>([])
const allMessages = ref<MessageBackend[]>([])

onMounted(async () => {// set the username and connect to the socket
    API.socket.auth = {username};
})

// connection error
API.socket.on("connect_error", (err: any) => {
    if (err.message === "Authentication error") {
        store.dispatch("logout");
    } else {
        // generic error
        console.log("Could not connect to server");
    }
});

API.socket.on("connect", () => {

    console.log(API.socket.connected);

    API.socket.on("userList", (users: ContactType[]) => {
        console.log(API.socket.connected);
        console.log("received userList");
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

        API.userList = users;
        contacts.value = users;
        isConnected.value = true;
        API.isConnected = true;
        store.state.contacts = users;
    });

    // handler new user connection
    API.socket.on("newUserConnection", (user: ContactType) => {
        user.self = false;
        API.userList.push(user);
        store.state.contacts.push(user);
        console.log("set new users");
    });

    // listen for global chat history
    API.socket.on("messageHistory", (messages: MessageBackend[]) => {
        allMessages.value = messages;
    });

    // listen for upcoming global chat messages
    API.socket.on("broadcastMessage", (message: MessageBackend) => {
        allMessages.value.push(message);
    });
})
</script>

<style scoped>
#home {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}

#side-bar {
    flex: 0 1 20%;
}
#global-chat {
    flex: 0 1 80%;
}
</style>
