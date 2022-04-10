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
    width: 30vw;
    padding-left: 0.3em;

}

.text-title {
    height: 2em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
}

.text {
    text-align: left;
    background-color: #3fb280;
    padding: 0.3em;
    padding-left: 0.5em;
    border-radius: 2em;
}
</style>