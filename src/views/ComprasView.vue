<template>
  <v-list lines="one">
    <v-list-item v-for="(order, index) in orders" :key="index">
      <v-list-subheader></v-list-subheader>
      <template v-slot:prepend>
        <v-icon icon="mdi-shopping-outline"></v-icon>
      </template>
      <v-list-item-title>Fecha de compra: {{ order.createdAt }}</v-list-item-title>
      <v-list-item-subtitle>{{ order.status }}</v-list-item-subtitle>
      <v-list-item-subtitle>Total ${{ order.totalCost }}</v-list-item-subtitle>
      <div v-for="(item, itemIndex) in order.items" :key="itemIndex">
        <v-list-item>
          <template v-slot:prepend>

            <v-icon icon="mdi-star-circle"></v-icon>

          </template>

          <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
        </v-list-item>
      </div>
      <v-divider></v-divider>
      <div></div>

      <!-- <div>{{ order }}</div> -->


    </v-list-item>
  </v-list>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../stores/store';
import { ref } from 'vue';
export default {
  setup() {
    const store = useAuthStore()
    const orders = ref([])
    const token = store.userData.token
    const headers = {
      'x-token': token
    };
    axios.get('https://back-ecommerce-8eh9potsi-jazqc.vercel.app/orders', { headers })
      .then(response => {
        orders.value = response.data.data
        console.log(orders.value)
      })
      .catch(error => {
        console.error(error);
      })
    return { orders }
  }
}
</script>

<style></style>