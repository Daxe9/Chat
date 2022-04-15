<template>
    <div id="home">
        <SideBar
            id="side-bar"
            :contacts="contacts"/>
        <GlobalChat id="global-chat"/>
    </div>
</template>

<script lang="ts" setup>
import SideBar from "../components/SideBar.vue";
import GlobalChat from "./GlobalChat.vue";
import {useStore} from "vuex";
import {ref} from "vue";

const store = useStore();
const contacts = ref(store.state.contacts);

</script>

<style scoped>
#home {
    display: flex;
    flex-direction: row;
    width: 100%
}

#side-bar {
    flex: 0 1 20%;
}
#global-chat {
    flex: 0 1 80%;
}
</style>
