<template>
    <TextBlock
        v-for="(message, i) in messages"
        :key="i"
        :author="message.author"
        :timestamp="message.timestamp"
        :content="message.content"
    />
    <button @click="sendMessage">Click here</button>
</template>

<script setup lang="ts">
import TextBlock from "./TextBlock.vue"
import {Message} from "../types"
import {ref} from "vue"
import SocketManager from "../services/SocketManager";
const API = new SocketManager()

function sendMessage(): void {
    API.sendMessage({
        author: "Davide",
        timestamp: "2020-01-01",
        content: "Hello",
        to_author: "Serena"
    } as Message)
}
// api call

const messages = ref<Message[]>([{
    author: "Davide",
    timestamp: "2020-01-01",
    content: "Hello",
    to_author: "Serena"
}])

</script>

<style scoped>

</style>