<template>
    <div id="global-chat">
        <div id="text-block">
            <h1>Global chat</h1>
            <FormInput @userMessage="userMessage"/>
        </div>
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
import TextBlock from "../components/TextBlock.vue";
import {MessageBackend} from "../types";
import {API} from "../services/SocketManager";
import {useStore} from "vuex";

const store = useStore();

defineProps<{
    allMessages: MessageBackend[];
}>();

/**
 * @description: send message to backend in global chat
 * @param {object} content content of the message
 * */
function userMessage({content}: { content: string }) {
    const message: MessageBackend = {
        content,
        author: store.state.username,
        to_author: "everyone",
        timestamp: new Date().toLocaleString()
    };
    API.sendMessage(message);
}
</script>

<style scoped>
#global-chat {
    overflow: scroll;
    height: 100vh;
}

#text-block {
    position: sticky;
    top: 0;
}
</style>
