<template>
    <div class="login-page">
        <form @submit.prevent="onSubmit">
            <label for="username">USERNAME</label>
            <input
                id="username"
                v-model="username"
                maxlength="19"
                placeholder="Your username"
                type="text"
            />
            <input type="submit" value="Enter" @click.prevent="onSubmit" />
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { API } from "../services/SocketManager";

const username = ref("");
const store = useStore();
const router = useRouter();

// login
function onSubmit() {
    store.dispatch("login", username.value);
    API.isConnected = true;
    router.push("/");
}
</script>

<style scoped>
.login-page {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
