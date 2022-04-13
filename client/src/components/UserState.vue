<template>
    <div class="user-state">
        <h3>{{props.username}}</h3>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    username: string
}>()
</script>

<style scoped>
.user-state {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10vh;
    height: 10vh;
    border-radius: 50%;
    background-color: #3fb280;
}
</style>