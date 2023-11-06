<template>
      <!-- <v-navigation-drawer
        color="primary"
      > -->
        <v-list>
          <v-list-item  title="Productos" to="/productos" ></v-list-item>
          <v-list-item  title="Nosotros" to="/about"></v-list-item>
          <v-list-item  title="Contactanos" to="/contact"></v-list-item>
          <v-list-item v-if="isAdminLogged" title="Administración" to="/adminPanel"></v-list-item>
        </v-list>

        <template>
          <div class="pa-2">
            <v-btn block @click="logout">
              Logout
            </v-btn>
          </div>
        </template>
      <!-- </v-navigation-drawer> -->
</template>

<script>
import { useAuthStore } from '../stores/store';
import { watch } from 'vue';
import { ref } from 'vue';

export default {
  name: 'navBar',
  
  setup() {
    const authStore = useAuthStore();

    watch(() => authStore.isAdminLogged, (newValue) => {
      isAdminLogged.value = newValue;
    });

    const isAdminLogged = ref(authStore.isAdminLogged);
    return {
      isAdminLogged,
    };
  },
  methods: {
    logout() {
      const authStore = useAuthStore();
      localStorage.clear();
      authStore.resetUserData(); //NO FUNCiona
    }
  }
};
</script>

<style>
div.v-list-item-title {
  font-size: 1.5rem;
}

</style>