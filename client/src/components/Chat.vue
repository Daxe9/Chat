<template>
    <div>
        <FormInput @userMessage="sendMessage" />
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
import { MessageBackend } from "../types";
import { ref } from "vue";
import SocketManager from "../services/SocketManager";

// const messages = ref<MessageBackend[]>([]);
// const API = new SocketManager();
// listenToEvents();

function sendMessage(msg: MessageBackend): void {
    msg.timestamp = new Date().toLocaleString();
    API.sendMessage(msg as MessageBackend);
}

function listenToEvents() {
    API.socket.once("messageHistory", (msgs: MessageBackend[]) => {
        messages.value = msgs;
    });
    API.socket.on("broadcastMessage", (message: MessageBackend) => {
        messages.value.push(message);
    });
}
</script>

<style scoped></style>
