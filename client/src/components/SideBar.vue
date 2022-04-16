<template>

    <div class="side-bar">
        <Contact
            v-for="contact in contacts"
            :key="contact.userID"
            :contact="contact"
        />
    </div>

</template>

<script lang="ts" setup>
import Contact from "./Contact.vue";
import {API} from "../services/SocketManager"
import {ref} from "vue";

const contacts = ref(API.userList)
console.log("here")
</script>

<style scoped>

.side-bar {
    background-color: #445760;
    color: #fff;
    height: 100%;
}

</style>