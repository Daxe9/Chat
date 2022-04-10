<template>
    <form @submit.prevent="sendData">
        <label for="author">Your name: </label>
        <input id="author" v-model="data.author" maxlength="19" type="text" />
        <label for="content">Message: </label>
        <input
            id="content"
            v-model="data.content"
            maxlength="254"
            type="text"
        />
        <label for="to_author">To: </label>
        <input
            id="to_author"
            v-model="data.to_author"
            maxlength="19"
            type="text"
        />
        <button type="submit">Submit</button>
    </form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { Message } from "../types";

const data = reactive({
    author: "" as string,
    to_author: "" as string,
    content: "" as string
} as Message);

const emits = defineEmits<{
    (e: "userMessage", data: Message): void;
}>();

function sendData() {
    if (!data.content) {
        return;
    }
    if (!data.author) {
        data.author = "Anonymous";
    }
    if (!data.to_author) {
        data.to_author = "Everyone";
    }

    // BRUH, parenthesis instead of square brackets
    emits("userMessage", JSON.parse(JSON.stringify(data)));
    data.author = "";
    data.to_author = "";
    data.content = "";
}
</script>
