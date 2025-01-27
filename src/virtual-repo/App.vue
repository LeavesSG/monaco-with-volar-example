<script setup lang="ts">
import { ref } from "vue";
import { incrementThenDecrement } from "./index";

const num = ref(0);
num.value = incrementThenDecrement()
</script>

<template>
    <div class="app">
        {{ num }}
    </div>
</template>

<style lang="css" scoped>
.app {
    color: aliceblue;
}
</style>
