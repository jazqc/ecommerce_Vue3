<template>
  <v-list>
    <v-list-item title="Productos" to="/productos"></v-list-item>
    <v-list-item title="Nosotros" to="/about"></v-list-item>
    <v-list-item title="Contactános" to="/contact"></v-list-item>
    <v-list-item v-if="isAdminLogged" title="Administración" to="/adminPanel"></v-list-item>
  </v-list>
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
};
</script>

<style>
div.v-list-item-title {
  font-size: 1.5rem;
}
</style>
