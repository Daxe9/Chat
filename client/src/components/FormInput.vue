<template>
    <form class="form" @submit.prevent="sendData">
        <label for="message">Message</label>
        <input type="text" name="message" v-model="data.content" id="message" />
    </form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

// message content
const data = reactive({
    content: ""
});

// emit user's message
const emits = defineEmits<{
    (e: "userMessage", data: { content: string }): void;
}>();

// handler for input and emit
function sendData() {
    if (!data.content) {
        return;
    }
    // BRUH, parenthesis instead of square brackets
    emits("userMessage", JSON.parse(JSON.stringify(data)));
    data.content = "";
}
</script>
<style scoped></style>
