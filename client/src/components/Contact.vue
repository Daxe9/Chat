<template>
    <router-link
        class="contact-link"
        :to="{name: 'ContactChat', params: {id: contact.userID}}">
        <h3># {{contact.username}}</h3>
    </router-link>
</template>

<script setup lang="ts">
import {ContactType} from "../types";
import PrivateChat from "../views/PrivateChat.vue";

defineProps<{
  contact: ContactType;
}>();


</script>

<style scoped>
.contact-link,
.contact-link:link,
.contact-link:visited {
    color: #fff;
    text-decoration: none;
}
.contact-link {
    display: block;
    padding: 10px;
    background-color: #858585;
    margin-bottom: 0.1em;
    text-align: left;
}
</style>