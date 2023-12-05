<template>
  <div v-if="errorMsg">
    <v-alert color="error" variant="tonal" icon="$error" text="Debe estar logueado">
    </v-alert>
  </div>
  <v-container fluid>
    <div>
      <v-select v-model="filter" :items="filterOptions" density="compact" label="Filtrar" class="select"></v-select>
    </div>
    <v-item-group v-model="selection" multiple>
      <v-row dense>
        <v-col v-for="product in filteredProducts" :key="product.id" align="center" sm="6" md="4" lg="3">
          <v-item>
            <v-card align="center">
              <v-img :src="product.img" class="align-end card-image mx-auto"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" cover>
              </v-img>
              <v-card-title class="title">{{ product.title }}</v-card-title>
              <v-card-subtitle class="subtitle">${{ product.price }}</v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  v-if="store.isLoggedIn" :icon="isInFavs(product) ? 'mdi-heart' : 'mdi-heart-outline'" @click="addFav(product)"></v-btn>
                <v-btn size="large" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
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


   axios.get('https://back-ecommerce-8eh9potsi-jazqc.vercel.app/products')
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
     axios.get('https://back-ecommerce-8eh9potsi-jazqc.vercel.app/favs', { headers })
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

   return { products, errorMsg, store, favsProducts, filter, getFavs, isInFavs}
 },

  data: () => ({
    selection: [],
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

    addFav(product, toggle) {
      const token = this.store.userData.token
      const headers = {
        'x-token': token
      };
      axios.post('https://back-ecommerce-8eh9potsi-jazqc.vercel.app/favs', { products: product.id }, { headers })
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

div.select {
  width: 50%;
}

icon.mdi-heart-outline {
  color: red;
}

div.v-card-title.title {
  font-weight: bold;
}

div.v-card-subtitle.subtitle {
  font-size: 1.5em;
  font-weight: bold;
}</style>
 