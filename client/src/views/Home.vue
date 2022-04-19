<template>
    <div id="home" v-if="isConnected">
        <SideBar id="side-bar" :contacts="contacts" />
        <GlobalChat id="global-chat" :allMessages="allMessages" />
    </div>
</template>

<script lang="ts" setup>
import SideBar from "../components/SideBar.vue";
import GlobalChat from "./GlobalChat.vue";
import { useStore } from "vuex";
import { API } from "../services/SocketManager";
import { ContactType, MessageBackend } from "../types";
import { ref, onMounted } from "vue";

const store = useStore();
const isConnected = ref<boolean>(API.isConnected);
const username: string = store.state.username;
const sessionID: string | null = localStorage.getItem("sessionID");
const contacts = ref<ContactType[]>(API.userList);
const allMessages = ref<MessageBackend[]>(API.historyMessages);

onMounted(async () => {
    // set the username and connect to the socket
    try {
        await API.login(username, sessionID);
    } catch (e) {
        console.log(e);
        await store.dispatch("logout");
    }
});

listenToEvents();

// listen to events
function listenToEvents() {
    API.socket.on(
        "session",
        ({ sessionID, userID }: { sessionID: string; userID: string }) => {
            Object.assign(API.socket.auth, { sessionID });
            localStorage.setItem("sessionID", sessionID);
            // @ts-ignore
            API.socket.userID = userID;
        }
    );

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
    });

    // listen for global chat history
    API.socket.on("messageHistory", (messages: MessageBackend[]) => {
        allMessages.value = messages;
        API.historyMessages = messages;
    });

    // listen for upcoming global chat messages
    API.socket.on("broadcastMessage", (message: MessageBackend) => {
        allMessages.value.push(message);
        API.historyMessages = allMessages.value;
    });
}
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
