<template>
    <div class="text-block">
        <div class="text-title">
            <h3>
                {{ author }}:
            </h3>
            <h5>{{ timestamp }}</h5>
        </div>

        <p class="text">{{ content }}</p>
    </div>
</template>

<script lang="ts" setup>

defineProps<{
    author: string,
    timestamp: string,
    content: string
}>();

</script>

<style scoped>
.text-block {
    width: 20vw;
    margin: 0 auto;
}

.text-title {
    height: 2em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
}

.text {
    padding-left: 0.3em;
    text-align: left;
    background-color: #F0F0F0;
}
</style>