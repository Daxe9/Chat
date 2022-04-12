<script lang="ts" setup>
import {useStore} from "vuex";
const store = useStore();
const username: string | null = localStorage.getItem("username");
if (username) {
    store.dispatch("login", username);
}
</script>

<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
