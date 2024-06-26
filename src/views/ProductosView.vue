<template>
  <div v-if="errorMsg">
    <v-alert color="error" variant="tonal" icon="$error" text="Debe estar logueado">
    </v-alert>
  </div>
  <v-alert  v-if="!store.isLoggedIn"   prominent
          border="top"
          color="primary"
          dense
      variant="outlined"
      type="info">Inicie sesión para acceder a nuestros productos</v-alert>
  <v-container fluid>
    <div>
      <v-row>
      <v-col cols="12" md="6" lg="6" class="d-flex justify-end" offset-lg="6">
      <v-select v-if="store.isLoggedIn" v-model="filter" :items="filterOptions" density="compact" label="Filtrar" class="select"></v-select>
      </v-col>
    </v-row>
    </div>
    <v-item-group >
      <v-row dense>
        <v-col v-for="product in filteredProducts" :key="product.id" align="center" sm="6" md="4" lg="3">
          <v-item v-slot="{toggle}">
            <v-card align="center">
              <v-img :src="product.img" class="align-end card-image mx-auto"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" cover>
              </v-img>
              <v-card-title class="title">{{ product.title }}</v-card-title>
              <v-card-subtitle class="subtitle">${{ product.price }}</v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  v-if="store.isLoggedIn" :icon="isInFavs(product) ? 'mdi-heart' : 'mdi-heart-outline'" @click="addFav(product, toggle)"></v-btn>
                <v-btn v-if="store.isLoggedIn" size="large" color="surface-variant" variant="text" icon="mdi-cart-plus"
                  @click="add(product)"></v-btn>
              </v-card-actions>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </v-container>
</template>
  
<script>
import { computed, ref, watch } from 'vue';
import { useAuthStore } from '../stores/store';
import axios from 'axios';

  export default {
 setup() {
   const products = ref([]);
   const errorMsg = ref(false);
   const store = useAuthStore();
   const favsProducts = ref([]);
   const filter = ref('');
   const URL = import.meta.env.VITE_API_URL


   axios.get(URL+'/products')
     .then(response => {
       products.value = response.data.data;
     })
     .catch(error => {
       console.error(error);
     });

   const getFavs = () => {
    if(store.isLoggedIn) {
      const headers = {
     'x-token': store.userData.token
   };
     axios.get(URL+'/favs', { headers })
       .then(response => {
         favsProducts.value = response.data.data;
       })
       .catch(error => {
         console.error(error);
       });
      }
   };
  
   watch(() => filter.value, (newValue) => {
     if (newValue === 'Mis favoritos') {
       getFavs();
     }
   });
   
   getFavs();
  const isInFavs = (product) => {

 return favsProducts.value.some(favProduct => favProduct.id === product.id);
 };

   return { products, errorMsg, store, favsProducts, filter, URL, getFavs, isInFavs}
 },

  data: () => ({
    filterOptions: ['Todos', 'Mis favoritos']
  }),

  methods: {

    add(product) {
      
      const carrito = this.store.carrito
      const index = carrito.findIndex(({ product: { id } }) => id === product.id);
      if (index != -1) {
        carrito[index].quantity += 1;
      } else {
        carrito.push({ product, quantity: 1 });
      }
      this.store.setCarrito = carrito.value
      localStorage.setItem("carrito", JSON.stringify(carrito));
      console.log(this.store.carrito)
    },

    addFav(product) {
      const URL = import.meta.env.VITE_API_URL
      const token = this.store.userData.token
      const headers = {
        'x-token': token
      };
      axios.post(URL+'/favs', { products: product.id }, { headers })
        .then(response => {
          console.log(response)
          this.getFavs()
        })
        .catch(error => {
          console.error(error)
          if (error.response.status = 401) {
            this.errorMsg = true;
            setTimeout(() => { this.errorMsg = false; }, 3000);
          }
        })
    },
  },

  computed: {
    filteredProducts() {
      if (this.filter === 'Mis favoritos') {
        return this.favsProducts;
      } else {
        return this.products;
      }
    },
  }
}
</script>
 
<style scoped>
.card-image {
  width: 100%;
  height: 380px;
  object-fit: cover;
}


div.v-card-title.title {
  font-weight: bold;
  color: #555456;
}

div.v-card-subtitle.subtitle {
  font-size: 1.5em;
  font-weight: bold;
}</style>
 