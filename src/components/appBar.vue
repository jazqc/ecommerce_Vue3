<template>
        <v-app-bar
          class="bg-primarySh"
          density="prominent"

        >  
          <v-app-bar-title class="text-center text-h4">TIENDA DE PERFUMES</v-app-bar-title>
  
          <template v-slot:append>
            <v-btn size="4.5rem">
              <v-icon icon="mdi-cart-variant" size="3rem"></v-icon>
            </v-btn>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn size="4.5rem">

              <v-icon icon="mdi-account-circle" v-bind="props" size="3rem"></v-icon>
              
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        </v-app-bar>

  </template>

  <script>
  export default {
  name: 'appBar',
  data: () => ({
      items: [
        { title: 'Login' },
      ],
})
  }
</script>

<style>
div.v-app-bar-title {
  margin: auto;
}
</style>