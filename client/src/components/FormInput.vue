<template>
    <form class="form" @submit.prevent="sendData">
        <div class="title">Welcome</div>
        <div class="subtitle">Let's create your message!</div>
        <div class="input-container ic1">
            <input id="name" v-model="data.author" class="input" maxlength="19" placeholder=" " type="text"/>
            <div class="cut"></div>
            <label class="placeholder" for="name">Your name</label>
        </div>
        <div class="input-container ic2">
            <input id="lastname" v-model="data.content" class="input"
                   maxlength="254" placeholder=" " type="text"/>
            <div class="cut"></div>
            <label class="placeholder" for="lastname">Message</label>
        </div>
        <div class="input-container ic2">
            <input id="email" v-model="data.to_author" class="input"
                   maxlength="19" placeholder=" " type="text"/>
            <div class="cut cut-short"></div>
            <label class="placeholder" for="email">Receiver's name</label>
        </div>
        <button class="submit" type="submit">Submit</button>
    </form>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import {Message} from "../types";

const data = reactive({
    author: "" as string,
    to_author: "" as string,
    content: "" as string
} as Message);

const emits = defineEmits<{
    (e: "userMessage", data: Message): void;
}>();

function sendData() {
    if (!data.content) {
        return;
    }
    if (!data.author) {
        data.author = "Anonymous";
    }
    if (!data.to_author) {
        data.to_author = "Everyone";
    }

    // BRUH, parenthesis instead of square brackets
    emits("userMessage", JSON.parse(JSON.stringify(data)));
    data.author = "";
    data.to_author = "";
    data.content = "";
}
</script>
<style scoped>
form {
    background-color: #15172b;
    border-radius: 20px;
    box-sizing: border-box;
    height: 500px;
    padding: 20px;
    width: 320px;
}

.title {
    color: #eee;
    font-family: sans-serif;
    font-size: 36px;
    font-weight: 600;
    margin-top: 30px;
}

.subtitle {
    color: #eee;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
}

.input-container {
    height: 50px;
    position: relative;
    width: 100%;
}

.ic1 {
    margin-top: 40px;
}

.ic2 {
    margin-top: 30px;
}

.input {
    background-color: #303245;
    border-radius: 12px;
    border: 0;
    box-sizing: border-box;
    color: #eee;
    font-size: 18px;
    height: 100%;
    outline: 0;
    padding: 4px 20px 0;
    width: 100%;
}

.cut {
    background-color: #15172b;
    border-radius: 10px;
    height: 20px;
    left: 20px;
    position: absolute;
    top: -20px;
    transform: translateY(0);
    transition: transform 200ms;
    width: 76px;
}

.cut-short {
    width: 50px;
}

.input:focus ~ .cut,
.input:not(:placeholder-shown) ~ .cut {
    transform: translateY(8px);
}

.placeholder {
    color: #65657b;
    font-family: sans-serif;
    left: 20px;
    line-height: 14px;
    pointer-events: none;
    position: absolute;
    transform-origin: 0 50%;
    transition: transform 200ms, color 200ms;
    top: 20px;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
    transform: translateY(-30px) translateX(10px) scale(0.75);
}

.input:not(:placeholder-shown) ~ .placeholder {
    color: #808097;
}

.input:focus ~ .placeholder {
    color: #dc2f55;
}

.submit {
    background-color: #08d;
    border-radius: 12px;
    border: 0;
    box-sizing: border-box;
    color: #eee;
    cursor: pointer;
    font-size: 18px;
    height: 50px;
    margin-top: 38px;
    /*// outline: 0;*/
    text-align: center;
    width: 100%;
}

.submit:active {
    background-color: #06b;
}

</style>