<template>
  <div>
    <v-app-bar class="bg-primarySh d-flex align-center">
      <template v-slot:prepend>
        <v-icon icon="mdi-menu" color="whiteSoft" size="3rem" @click.stop="drawer = !drawer"></v-icon>
      </template>
      <router-link to="/">
      <v-app-bar-title class="text-center text-h4">eScentWorld</v-app-bar-title>
    </router-link>
      <template v-slot:append>
        <v-btn size="4.5rem">
          <v-badge :content="carritoLength">
            <v-icon icon="mdi-cart-variant" color="whiteSoft" size="3rem" @click="toCarrito"></v-icon>
          </v-badge>
        </v-btn>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn size="4.5rem">
              <v-icon icon="mdi-account-circle" color="whiteSoft" v-bind="props" size="3rem"></v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="item in filteredItems" :key="item.id" @click="clicked(item)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>

        </v-menu>
        <v-dialog v-model="showDialog" width="auto">
          <loginForm @login-successful="showDialog = false"></loginForm>
        </v-dialog>
      </template>
    </v-app-bar>
  </div>
  <v-navigation-drawer v-model="drawer" location="left" color="primary">
    <NavBar></NavBar>
  </v-navigation-drawer>
</template>
 
<script setup>
import loginForm from './loginForm.vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/store';
import { ref, computed, watch } from 'vue';
import NavBar from './navBar.vue';

const showDialog = ref(false);
const store = useAuthStore();
const router = useRouter();
const drawer = ref(false);


const items = computed(() => [
  { id: 1, title: 'Login', condition: store.isLoggedIn == false },
  { id: 2, title: 'Mis compras', condition: store.isLoggedIn, path: '/compras' },
  { id: 3, title: 'Mis favoritos', condition: store.isLoggedIn, path: '/favs' },
  { id: 4, title: 'Mis datos', condition: store.isLoggedIn, path: '/profile' },
  { id: 5, title: 'Logout', condition: store.isLoggedIn }
]);

const filteredItems = computed(() => {
  return items.value.filter(item => item.condition);
})
const carritoLength = computed(() => store.carrito.length);


watch(() => store.carrito, () => {
  return carritoLength.value = store.carrito.length;
}); 





const clicked = (item) => {
  if (item.id === 1) {
    showDialog.value = true;
  }
  else if (item.id === 5) {
    localStorage.clear();
    store.resetUserData();  //ARREGLAR
  }
  else {
    router.push(item.path)
  }

}

const toCarrito = () => {
  router.push("/carrito");
};

</script>
 
<style>
div.app-bar-nav-icon {
  size: 3rem;
}
a.router-link, .v-app-bar-title{
  color: #f8f8f8;
  text-decoration: none;

}
</style>