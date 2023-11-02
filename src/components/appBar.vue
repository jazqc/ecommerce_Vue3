<template>
        <v-app-bar
          class="bg-primarySh"
          density="prominent"

        >  
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
              <v-btn
                @click="showDialog = true"
              >
                Login
              </v-btn>
            </v-menu>
        
              <v-dialog

      v-model="showDialog"
      width="auto"
    >
    <loginForm @login-successful="showDialog = false"></loginForm>
  </v-dialog>
          
        </template> 
        </v-app-bar>

  </template>

  <script setup>
import loginForm from './loginForm.vue';
import { RouterLink } from 'vue-router';

import { ref } from 'vue'

const showDialog = ref(false)

</script>

<style>
div.v-app-bar-title {
  margin: auto;
}
</style>