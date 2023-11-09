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
                <th>

                </th>
                <th>

                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in carrito" :key="item.id">
                <td>
                    <v-img :src="item.product.img"></v-img>
                </td>

                <td>{{ item.product.title }}</td>
                <td>${{ item.product.price }}</td>
                <td>{{ item.quantity }}</td>
                <td>${{ item.quantity * item.product.price }}</td>
                <td><v-btn size="large" color="surface-variant" variant="text" icon="mdi-minus-circle"
                        @click="decrement(item)"></v-btn></td>
                <td><v-btn size="large" color="surface-variant" variant="text" icon="mdi-delete"
                        @click="deleteItem(item)"></v-btn></td>

            </tr>

        </tbody>

    </v-table>
    <!-- <h2 class="text-right">Total ${{ totalCarrito }}</h2> -->
</template>

<script setup>
import { useAuthStore } from '../stores/store';
const store = useAuthStore()
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
console.log(store.carrito)


const deleteItem = (item) => {
    const index = carrito.findIndex(product => product.id === item.id);
    carrito.splice(index, 1)
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log(carrito)
}
const decrement = (item) => {
    console.log(item)
}
</script>

<style>
thead.header {
    font-size: 1.5em;
}
</style>