<template>
    <v-table fixed-header class="custom-table">
      <thead>
        <tr>
            <th class="text-left">
            IMG
          </th>
          <th class="text-left">
            Nombre
          </th>
          <th class="text-left">
            Precio unitario
          </th>
          <th class="text-left">
            Cantidad
          </th>
          <th class="text-left">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in carrito"
          :key="item.id"
        >
        <td>
            <v-img :src="item.product.img"></v-img>
            </td>

          <td>{{ item.product.title }}</td>
          <td>${{ item.product.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>${{ item.quantity*item.product.price }}</td>


        </tr>
      </tbody>
    </v-table>

  </template>

<script setup>
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
// totalCarrito = 0;

</script>

<style>
thead.header {
font-size: 1.5em;
}
</style>