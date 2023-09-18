<template>
      <v-navigation-drawer
        color="primary"
        permanent
        style=""
      >
        <v-list>
          <v-list-item  title="Home" to="/" ></v-list-item>
          <v-list-item  title="Productos" to="/productos" ></v-list-item>
          <v-list-item  title="Nosotros" to="/about"></v-list-item>
          <v-list-item  title="Contactanos" to="/contact"></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block>
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
</template>

<script>
export default {
  name: 'navBar'
}
</script>

<style>
div.v-list-item-title {
  font-size: 1.5rem;
}

</style>