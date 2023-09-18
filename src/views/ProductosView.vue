<script setup>
import { ref } from 'vue';

const products = ref([]);
fetch('https://api.zecatdifapro.com/generic_product?order[price]=asc&&page=1&limit=24')
    .then(response => response.json())
    .then(data => products.value = data.generic_products);

// const items = ref([
//   { id: 1, name: 'Item 1' },
//   { id: 2, name: 'Item 2' },
//   { id: 3, name: 'Item 3' }
// ]);


</script>

<template>
    <!-- <div>
      <ul>
        <li v-for="item in items" :key="item.id">{{ item.name }}</li>
      </ul>
    </div> -->
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="product in products"
          :key="product.id"
          align="center"
          sm="6"
        md="4"
        lg="3"
        >
        <v-card align="center">
            <v-img
              :src="product.images[0].image_url"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              cover
            >
            </v-img>
            <v-card-title class="text-deep-purple-darken-4 font-weight-bold text-center" v-text="product.name"></v-card-title>
            <b-card-sub-title class="text-h6 text-black font-weight-bold text-center">${{ product.price }}</b-card-sub-title>


            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn size="large" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>

              <v-btn size="large" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>

              <v-btn size="large" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
              <v-btn size="large" color="surface-variant" variant="text" icon="mdi-cart-plus"></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>



<style scoped>
</style>