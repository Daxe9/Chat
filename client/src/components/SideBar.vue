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
import {ContactType} from "../types";
import Contact from "./Contact.vue";

defineProps<{
    contacts: ContactType[];
}>();

</script>

<style scoped>

.side-bar {
    background-color: #445760;
    color: #fff;
    height: 100%;
}

</style>