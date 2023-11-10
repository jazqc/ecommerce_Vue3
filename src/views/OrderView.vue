<template>
    <v-container>
<v-form @submit.prevent>
    <v-text-field
        v-model="name"
        :rules="rules"
        label="Nombre"
      ></v-text-field>
      <v-text-field
        v-model="name"
        :rules="rules"
        label="Número de celular"
      ></v-text-field>
      <v-text-field
        v-model="name"
        :rules="rules"
        label="Dirección de envio"
      ></v-text-field>
      <v-text-field
        v-model="name"
        :rules="rules"
        label="Localidad"
      ></v-text-field>
      CALCULAR COSTO DE ENVIO
</v-form>
</v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>