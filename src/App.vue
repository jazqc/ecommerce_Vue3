
<script setup>
import { RouterView } from 'vue-router'
import navBar from './components/navBar.vue';
import appBar from './components/appBar.vue'
</script>

<template>
<v-app>
  <appBar class="bar"></appBar>
  <navBar></navBar>
<v-main>
<v-content>
    <RouterView />
</v-content>
</v-main>
</v-app>
</template>

<style>
.bar {
width: 100%;
}
</style>
