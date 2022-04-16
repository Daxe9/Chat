<template>
    <div>
        <h1>Global chat</h1>
        <FormInput @userMessage="userMessage" />
        <TextBlock
            v-for="(message, i) in allMessages"
            :key="i"
            :author="message.author"
            :content="message.content"
            :timestamp="message.timestamp"
        />
    </div>
</template>

<script setup lang="ts">
import FormInput from "../components/FormInput.vue";
import TextBlock from "../components/TextBlock.vue"

import {MessageBackend} from "../types";
import {API} from "../services/SocketManager";
import {useStore} from "vuex";
import {ref} from "vue";


const allMessages = ref([] as MessageBackend[]);
const store = useStore();

API.socket.on("messageHistory", (messages: MessageBackend[]) => {
    allMessages.value = messages;
});

API.socket.on("broadcastMessage", (message: MessageBackend) => {
    allMessages.value.push(message);
});

function userMessage({content}: {content: string}) {
    const message: MessageBackend = {
        content,
        author: store.state.username,
        to_author: "everyone",
        timestamp: new Date().toLocaleString(),
    }
    API.sendMessage(message);
}

</script>

<style scoped>

</style>