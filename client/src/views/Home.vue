<template>
    <div id="home">
        <SideBar
            id="side-bar"
            :contacts="contacts"/>
        <GlobalChat id="global-chat" />
    </div>
</template>

<script lang="ts" setup>
import SideBar from "../components/SideBar.vue";
import GlobalChat from "./GlobalChat.vue";
import {useStore} from "vuex";
import {onUnmounted, ref} from "vue";
import {API} from "../services/SocketManager"
import {ContactType, MessageBackend} from "../types";

const store = useStore();
const username = store.state.username
API.socket.auth = {username}
const userList = ref<ContactType[]>([])
const contacts = ref(store.state.contacts);

// API.socket.auth = store.state.username;
API.connectToDB();

// connection error
API.socket.on("connect_error", (err: any) => {
    if (err.message === "Authentication error") {
        store.dispatch("logout");
    } else {
        // generic error
        console.log("Could not connect to server");
    }
});

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
    userList.value = users;
});

// handler new user connection
API.socket.on("newUserConnection", (user: ContactType) => {
    user.self = false;
    userList.value.push(user);
});

// remove connection error handler
onUnmounted(() => {
    API.socket.off("connect_error")
});


</script>

<style scoped>
#home {
    display: flex;
    flex-direction: row;
    width: 100%
}

#side-bar {
    flex: 0 1 20%;
}
#global-chat {
    flex: 0 1 80%;
}
</style>
