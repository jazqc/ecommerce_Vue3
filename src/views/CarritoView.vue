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
  <v-divider></v-divider>
  <div class="text-h4 font-weight-medium text-right pa-5">Total ${{ totalCarrito }}

    <v-btn type="submit" color="primary" size="x-large" tonal>
      <router-link to="/order">COMPRAR</router-link>
    </v-btn>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/store';
import { ref, computed } from 'vue';

const store = useAuthStore();
const carrito = ref(store.carrito || []);

/**
* Calculate the total price of all items in the cart
* @returns {number} - The total price of all items in the cart
*/

const totalCarrito = computed(() => {
  let total = 0;
  for (const item of carrito.value) {
    total += item.product.price * item.quantity;
  }
  return total;
});

/**
* Find the index of a specific item in the cart
* @param {Object} item - The item to find in the cart
* @returns {number} - The index of the item in the cart, or -1 if the item is not found
*/

const getIndex = (item) => carrito.value.findIndex(({ product: { id } }) => id === item.product.id);

/**
* Remove a specific item from the cart
* @param {Object} item - The item to remove from the cart
*/

const deleteItem = (item) => {
  const index = getIndex(item);
  carrito.value.splice(index, 1);
  updateCarrito(carrito.value);
};

/**
* Decrease the quantity of a specific item in the cart. If is there is only one, it will remove it
* @param {Object} item - The item to decrease the quantity of
*/
const decrement = (item) => {
  const index = getIndex(item);
  if (carrito.value[index].quantity > 1) {
    carrito.value[index].quantity--;
  } else {
    carrito.value.splice(index, 1);
  }
  updateCarrito(carrito.value);
};

/**
* Set the cart in the store and local storage. 
* @param {Array}  carrito - the updated cart
*/

function updateCarrito(carrito) {
  store.setCarrito = carrito
  localStorage.setItem("carrito", JSON.stringify(carrito));
  console.log(store.carrito);
}
</script>


<style>
thead.header {
  font-size: 1.5em;
}

a {
  color: #f8f8f8;
  text-decoration: none;

}
</style>