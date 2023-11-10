
<template>
  <v-container fluid>
    <v-item-group v-model="selection" multiple>
      <v-row dense>

        <v-col v-for="product in products" :key="product._id" align="center" sm="6" md="4" lg="3">

          <v-item v-slot="{ isSelected, toggle }">
            <v-card align="center">
              <v-img :src="product.img" class="align-end card-image mx-auto"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" cover>
              </v-img>
              <v-card-title
                class="text-deep-purple-darken-4 font-weight-bold text-center">{{ product.title }}</v-card-title>
              <v-card-subtitle class="text-h6 text-black font-weight-bold text-center">${{ product.price
              }}</v-card-subtitle>


              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn :icon="isSelected ? 'mdi-heart' : 'mdi-heart-outline'" @click="toggle"></v-btn>

                <v-btn size="large" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>

                <v-btn size="large" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
                <v-btn size="large" color="surface-variant" variant="text" icon="mdi-cart-plus" @click="add(product)"></v-btn>
              </v-card-actions>
            </v-card>
          </v-item>

        </v-col>

      </v-row>
    </v-item-group>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '../stores/store';


export default {

  setup() {
    
    const products = ref([]);

    fetch('https://back-ecommerce-1wni1lbxi-jazqc.vercel.app/products')
      .then(response => response.json())
      .then(data => products.value = data.data)
    return { products }
  },
  data: () => ({
    selection: []
    
  }),
  methods: {

add(product) {
  const store = useAuthStore();
  const carrito = store.carrito
  const index = carrito.findIndex(({product: {id}}) => id === product.id);
  if(index != -1) {
    carrito[index].quantity += 1;
  } else {
    carrito.push({product, quantity: 1});
  }
  store.setCarrito = carrito
  localStorage.setItem("carrito", JSON.stringify(carrito));
  console.log(store.carrito)
}
    }
  }


</script>

<style scoped>
.card-image {
  width: 100%;
  height: 380px;
  object-fit: cover;
}

icon.mdi-heart-outline {
  color: red;
}
</style>