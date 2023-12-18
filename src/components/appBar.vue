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
        <v-btn size="4.5rem" v-if="store.isLoggedIn">
          <v-badge :content="carritoLength">
            <v-icon  icon="mdi-cart-variant" color="whiteSoft" size="3rem" @click="toCarrito"></v-icon>
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
        <v-dialog v-model="showWelcomeDialog" width="auto" class="dialog">
          <v-alert  v-if="showWelcomeDialog"   prominent
          border="top"
          color="primary"
          dense
      variant="outlined"
      type="info">Bienvenido! Le sugerimos iniciar sesión para acceder a nuestros productos</v-alert>

        </v-dialog>

        <v-dialog v-model="showDialog" width="auto" persistent class="dialog">

          <loginForm @close-dialog="showDialog = false"> 
          </loginForm>

        </v-dialog>
      </template>
    </v-app-bar>
  </div>
  <v-navigation-drawer v-model="drawer" location="left" color="primary">
<navBar></navBar>
  </v-navigation-drawer>
</template>
 
<script setup>
import loginForm from './loginForm.vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/store';
import { ref, computed, watch, onMounted } from 'vue';
import navBar from './navBar.vue';

const showDialog = ref(false);
const store = useAuthStore();
const router = useRouter();
const drawer = ref(false);
const showWelcomeDialog = ref(false)


onMounted(() => {
 if (!store.isLoggedIn) {
  showWelcomeDialog.value = true;
   setTimeout(() => {
    showWelcomeDialog.value = false;
  }, 2500);
 } 
});

const items = computed(() => [
  { id: 1, title: 'Login', condition: store.isLoggedIn == false },
  { id: 2, title: 'Mis compras', condition: store.isLoggedIn, path: '/compras' },
  { id: 4, title: 'Mis datos', condition: store.isLoggedIn, path: '/profile' },
  { id: 5, title: 'Logout', condition: store.isLoggedIn }
]);

const filteredItems = computed(() => {
  return items.value.filter(item => item.condition);
})
watch(() => store.userData, () => {
 filteredItems.value = items.value.filter(item => item.condition);
});

const carritoLength = computed(() => {
 return store && store.carrito ? store.carrito.length : 0;
});

watch(() => store.carrito, () => {
  return carritoLength.value = store.carrito.length;
}); 


const clicked = (item) => {
  if (item.id === 1) {
    showDialog.value = true;
  }
  else if (item.id === 5) {
    localStorage.clear();
    store.resetUserData(); 
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
div.v-alert {
  margin-bottom: 3em;
  background-color: #f8f8f8;
}
</style>