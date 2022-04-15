<script lang="ts" setup>
import {useStore} from "vuex";
import SideBar from "./components/SideBar.vue";
import {ref} from "vue";
const store = useStore();
const username: string | null = localStorage.getItem("username");
if (username) {
    store.dispatch("login", username);
}


const contacts = ref(store.state.contacts)

</script>

<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style>
body,
html {
    height: 100vh;
    margin: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    height: 100%;
    flex-direction: row;
}
</style>
