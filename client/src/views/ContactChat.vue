<template>
    <div>
        <h2> Ciao <!--{{user.username}}--></h2>
        <router-link :to="{name: 'Home'}" >Back to Home</router-link>
        <FormInput />
    </div>
</template>

<script setup lang="ts">
// import {API} from "../views/Home.vue";
import FormInput from "../components/FormInput.vue";
// const user = API.currentContact


</script>

<style scoped>

</style>