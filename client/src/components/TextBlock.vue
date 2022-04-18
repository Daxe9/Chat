<template>
    <div class="text-block">
        <div class="text-title">
            <div>
                {{ author }}
                <h5>@{{ timestamp }}:</h5>
            </div>
        </div>
        <p class="text">{{ content }}</p>
    </div>
</template>

<script lang="ts" setup>
// props for rendering block
defineProps<{
    author: string;
    timestamp: string;
    content: string;
}>();
</script>

<style scoped>
.text-block {
    width: 20vw;
    padding-left: 0.3em;
}

.text-title {
    display: flex;
    text-align: left;
}
.text-block h3,
.text-block h5 {
    margin: 0;
}
.text {
    text-align: left;
    background-color: #3fb280;
    padding: 5%;
    margin-top: 0;
    padding-left: 0.5em;
    border-radius: 2em;
    width: 20vw;
    word-wrap: break-word;
}
</style>
