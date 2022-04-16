<script lang="ts" setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {API} from "./services/SocketManager"
import {onUnmounted, ref} from "vue";
import {ContactType} from "./types";


const store = useStore();
const router = useRouter();
const username: string | null = localStorage.getItem("username");
const isConnected = ref<boolean>(false);

if (username) {
    store.dispatch("login", username);
    API.socket.auth = {username}
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
        API.userList = users;
        store.state.contacts = users;
        console.log("set all users")
        isConnected.value = true;
    });

    // handler new user connection
    API.socket.on("newUserConnection", (user: ContactType) => {
        user.self = false;
        API.userList.push(user);
        store.state.contacts.push(user);
        console.log("set new users")
    });

} else {
    router.push("/login");
}


onUnmounted(() => {
    API.socket.off("connect_error")
});
</script>

<template>
    <div id="app">
        <router-view v-if="isConnected" />
    </div>
</template>

<style>
body,
html {
    height: 100vh;
    margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: row;
}
</style>
