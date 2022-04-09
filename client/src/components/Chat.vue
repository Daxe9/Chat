<template>
    <TextBlock
        v-for="(message, i) in messages"
        :key="i"
        :author="message.author"
        :timestamp="message.timestamp"
        :content="message.content"
    />
</template>

<script setup lang="ts">
import TextBlock from "./TextBlock.vue"
import {Message} from "../types"
import {ref} from "vue"
// api call

const messages = ref<Message[]>([{
    author: "Davide",
    timestamp: "2020-01-01",
    content: "Hello"
}])

</script>

<style scoped>

</style>