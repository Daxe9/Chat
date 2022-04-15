<template>
    <form class="form" @submit.prevent="sendData">
        <label for="message">Message</label>
        <input type="text" name="message" id="message">
    </form>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import {Message} from "../types";

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
<style scoped>

</style>