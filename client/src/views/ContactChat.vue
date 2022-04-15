<template>
    <div>
        <h2>{{contact.username}}</h2>
    </div>
</template>

<script setup lang="ts">
import {ContactType} from "../types";

defineProps<{
    contact: ContactType
}>()
</script>

<style scoped>

</style>