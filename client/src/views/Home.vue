<template>
    <div id="home">
        <SideBar id="side-bar" />
        <GlobalChat id="global-chat" />
    </div>
</template>

<script lang="ts" setup>
import SideBar from "../components/SideBar.vue";
import GlobalChat from "./GlobalChat.vue";
import {useStore} from "vuex";

const store = useStore();
const username = store.state.username


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
