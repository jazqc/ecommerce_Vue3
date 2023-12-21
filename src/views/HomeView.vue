<template>
  <div class="hero">
    <h2 class="herotext-primary font-weight-bold text-center align-center text-h5 title-with-bg" primary>In fringilla
      justo
      nec ante blandit dapibus. Aenean at varius dui.</h2>
  </div>
  <v-container class="carousel">
    <v-carousel cycle interval="3000" max-height="50em" hide-delimiter-background show-arrows="hover">
      <v-carousel-item v-for="product in products" :key="product.id" :src="product.img" d-flex justify-center align-center
        show-arrows="hover"></v-carousel-item>
    </v-carousel>
    <div v-if="loading" class="d-flex justify-center align-center fill-height">
      <v-progress-circular
      :size="70"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
    </div>
  </v-container>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';

const products = ref([]);
const loading = ref(false);
const URL = import.meta.env.VITE_API_URL

/**
* Fetches products from the data base and assigns it to the `products` value.
*/
const fetchProducts = async () => {
 loading.value = true; 
 try {
   const response = await axios.get(URL + '/products');
   products.value = response.data.data;
 } catch (error) {
   console.error(error);
 } finally {
   loading.value = false; 
 }
}

fetchProducts(); 

</script>
  
<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(../assets/2.jpg);
  background-position: center;
  background-size: cover;
  height: 30vh;
  width: 100%;
}

.carousel {
  height: 50vh;
  width: 100%;
}

.title-with-bg {
  background-color: #f8f8f8;
  padding: 1rem;
  color: #6F6D71;
}
</style>
  