<template>
  <v-app>
    <appBar></appBar>
    <navBar></navBar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script>
import { RouterView } from 'vue-router';
import { useAuthStore } from './stores/store';
import { watch } from 'vue';
import appBar from './components/appBar.vue';
import navBar from './components/navBar.vue';

export default {
  components: {
    appBar,
    navBar,
  },
  setup() {
    const store = useAuthStore();

    const updateStore = () => {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        store.setUserData(parsedUserData);
      }
    };

    watch(() => localStorage.getItem('userData'), updateStore);
    updateStore();
  },
};
</script>

<style>
.bar {
  width: 100%;
}
</style>