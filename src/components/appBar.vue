<template>
  <v-app-bar class="bg-primarySh" density="prominent">
    <template v-slot:prepend>
      <router-link to="/" class="v-btn v-btn--icon">
        <v-icon icon="mdi-home-circle" color="whiteSoft" size="3rem"></v-icon>
      </router-link>
    </template>
    <v-app-bar-title class="text-center text-h4">eScentWorld</v-app-bar-title>
    <template v-slot:append>
      <v-btn size="4.5rem">
        <v-icon icon="mdi-cart-variant" color="whiteSoft" size="3rem"></v-icon>
      </v-btn>
    <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn size="4.5rem">
            <v-icon icon="mdi-account-circle" color="whiteSoft" v-bind="props" size="3rem"></v-icon>
          </v-btn>
        </template>
        <v-list>
        <v-list-item
          v-for="item in filteredItems"
          :key="item.id"
          @click="clicked(item)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>

        <!-- <v-btn @click="showDialog = true">Login</v-btn>
        <v-btn v-if="isLoggedIn" @click="showDialog = true">Mis Favoritos</v-btn>
        <v-btn v-if="isLoggedIn" @click="showDialog = true">Mis compras</v-btn> -->
      </v-menu>



      <v-dialog v-model="showDialog" width="auto">
        <loginForm @login-successful="showDialog = false"></loginForm>
      </v-dialog>
    </template>
  </v-app-bar>
 </template>
 
 <script setup>
 import loginForm from './loginForm.vue';
 import { RouterLink } from 'vue-router';
 import { useRouter } from 'vue-router';
 import { useAuthStore } from '../stores/store';
 import { ref, computed } from 'vue';
 
 const showDialog = ref(false);
 const authStore = useAuthStore();
 const router = useRouter();

 const items = computed(() => [
  {id: 1, title: 'Login', condition: authStore.isLoggedIn == false},
  {id: 2, title: 'Mis compras', condition: authStore.isLoggedIn, path: '/compras' },
  {id: 3, title: 'Mis favoritos', condition: authStore.isLoggedIn, path: '/favs' },
  {id: 4, title: 'Mis datos', condition: authStore.isLoggedIn, path: '/profile' }
]);

const filteredItems = computed(() => {
 return items.value.filter(item => item.condition);
})


const clicked = (item) => {
  if (item.id === 1) {
    showDialog.value = true;
  }
  else {
    router.push(item.path)
  }
 
  } 

 </script>
 