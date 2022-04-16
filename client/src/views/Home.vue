<template>
    <div id="home" v-if="isConnected">
        <SideBar id="side-bar" />
        <GlobalChat id="global-chat" />
    </div>
</template>

<script lang="ts" setup>
import SideBar from "../components/SideBar.vue";
import GlobalChat from "./GlobalChat.vue";
import {useStore} from "vuex";
import {API} from "../services/SocketManager"
import {ContactType} from "../types";
import {ref} from "vue";

const store = useStore()
const isConnected = ref<boolean>(API.isConnected);

API.socket.on("userList", (users: ContactType[]) => {
    console.log("received userList")
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
    isConnected.value = true;
    API.isConnected = true;
    store.state.contacts = users;
});

// handler new user connection
API.socket.on("newUserConnection", (user: ContactType) => {
    user.self = false;
    API.userList.push(user);
    store.state.contacts.push(user);
    console.log("set new users")
});

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
