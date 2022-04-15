<template>
    <div>
        <SideBar :contacts="contacts"/>
        <button @click="logout">log out</button>
    </div>
</template>

<script lang="ts" setup>
import SideBar from "../components/SideBar.vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ref} from "vue";

const store = useStore();
const router = useRouter();
const contacts = ref(store.state.contacts);
function logout(): void {
    store.dispatch("logout");
    router.push({name: "Login"});
}
</script>

<style scoped></style>
