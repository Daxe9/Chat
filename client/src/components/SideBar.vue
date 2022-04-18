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
import { ContactType } from "../types";

// all contacts
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
