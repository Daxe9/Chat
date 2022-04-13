<template>
    <h1>Hello guys, welcome to chatroom</h1>
    <Chat />
    <button @click="logout">log out</button>
</template>

<script lang="ts" setup>
import Chat from "../components/Chat.vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();
function logout(): void {
    store.dispatch("logout");
    router.push({name: "Login"});
}
</script>

<style scoped></style>
