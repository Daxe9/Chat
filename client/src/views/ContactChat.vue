<template>
    <div>
        <h2>{{ receiver.username }}</h2>
        <router-link :to="{ name: 'Home' }">Back to Home</router-link>
        <FormInput @userMessage="userMessage" />
        <TextBlock
            v-for="(message, index) in privateMessages"
            :key="index"
            :author="message.author"
            :timestamp="message.timestamp"
            :content="message.content"
        />
    </div>
</template>

<script setup lang="ts">
import FormInput from "../components/FormInput.vue";
import TextBlock from "../components/TextBlock.vue";
import { API } from "../services/SocketManager";
import { useRoute } from "vue-router";
import { ContactType, MessageBackend } from "../types";
import { useStore } from "vuex";
import { ref } from "vue";

const route = useRoute();
const store = useStore();
const privateMessages = ref([]);
const receiver: ContactType | undefined = API.userList.find(
    (user) => user.userID === route.params.id
);

// handler for private messages
API.socket.on("privateMessage", ({ content, from }) => {
    // @ts-ignore
    privateMessages.value.push(content);
    console.log(content);
});

// submit message function
function userMessage(data: { content: string }): void {
    if (receiver) {
        const message: MessageBackend = {
            author: store.state.username,
            content: data.content,
            to_author: receiver.username,
            timestamp: new Date().toLocaleString()
        };
        API.socket.emit("privateMessage", {
            content: message,
            to: route.params.id
        });
        // @ts-ignore
        privateMessages.value.push(message);
    }
}
</script>

<style scoped></style>
