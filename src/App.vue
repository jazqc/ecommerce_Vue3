<template>
  <v-app>
    <appBar></appBar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { useAuthStore } from './stores/store';
import { watch } from 'vue';
import appBar from './components/appBar.vue';

const store = useAuthStore();

const updateStore = () => {
  const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
    const parsedUserData = JSON.parse(storedUserData);
    store.setUserData(parsedUserData);
  }
};

watch(() => localStorage.getItem('userData'), updateStore);
updateStore();

const updateCarrito = () => {
  const storedCarrito = localStorage.getItem("carrito");
  if (storedCarrito) {
    const parsedCarrito = JSON.parse(storedCarrito);
    store.setCarrito(parsedCarrito);
    console.log(store.carrito);
  }
};

updateCarrito();

</script>


<style>
.bar {
  width: 100%;
}


</style>