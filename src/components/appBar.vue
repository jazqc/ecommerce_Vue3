<template>
  <div>
  <v-app-bar class="bg-primarySh d-flex align-center">
    <template v-slot:prepend>
      <v-icon icon="mdi-menu" color="whiteSoft" size="3rem" @click.stop="drawer = !drawer"></v-icon>
    </template>      

    <v-app-bar-title class="text-center text-h4">eScentWorld</v-app-bar-title>
    <template v-slot:append>
      <v-btn size="4.5rem">
        <v-badge :content="0">
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
  <v-navigation-drawer
        v-model="drawer"
        location="left"
        color="primary"
      >
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
const authStore = useAuthStore();
const router = useRouter();
const drawer = ref(false);
const carrito = ref([]);

const items = computed(() => [
  { id: 1, title: 'Login', condition: authStore.isLoggedIn == false },
  { id: 2, title: 'Mis compras', condition: authStore.isLoggedIn, path: '/compras' },
  { id: 3, title: 'Mis favoritos', condition: authStore.isLoggedIn, path: '/favs' },
  { id: 4, title: 'Mis datos', condition: authStore.isLoggedIn, path: '/profile' },
  { id: 5, title: 'Logout', condition: authStore.isLoggedIn }
]);

const filteredItems = computed(() => {
  return items.value.filter(item => item.condition);
})



// watch(carrito, (newCarrito) => {
//   localStorage.setItem("carrito", JSON.stringify(newCarrito));
// });

// watch(() => localStorage.getItem("carrito"), (newCarrito) => {
//   carrito = JSON.parse(newCarrito || "[]");
// });



const clicked = (item) => {
  if (item.id === 1) {
    showDialog.value = true;
  }
  else if (item.id ===5) {
      localStorage.clear();
      authStore.resetUserData();
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
div.app-bar-nav-icon{
size: 3rem;
}
</style>