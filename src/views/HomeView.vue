<template>
  <div class="hero">
    <v-title class="herotext-primary font-weight-bold text-center align-center text-h5 title-with-bg" primary>In fringilla justo
      nec ante blandit dapibus. Aenean at varius dui.</v-title>
  </div>
  <v-container class="carousel">
    <v-carousel cycle max-height="50em" hide-delimiter-background show-arrows="hover">
      <v-carousel-item v-for="product in products" :key="product.id" :src="product.img" d-flex justify-center align-center
        show-arrows="hover"></v-carousel-item>
    </v-carousel>
  </v-container>
</template>
  
<script setup>
import { ref } from 'vue';

const products = ref([]);

fetch('https://back-ecommerce-1wni1lbxi-jazqc.vercel.app/products')
  .then(response => response.json())
  .then(data => products.value = data.data);

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
  