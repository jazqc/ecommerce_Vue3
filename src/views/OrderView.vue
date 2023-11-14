<template>
  <v-container>
    <v-form @submit.prevent="submit">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field variant="underlined" v-model="formData.name" :rules="required"
            label="Nombre y apellido"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field variant="underlined" v-model="formData.cellphone" :rules="required"
            label="Número de celular"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field variant="underlined" v-model="formData.adress" :rules="required"
            label="Dirección de envio"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field variant="underlined" v-model="formData.location" :rules="required"
            label="Localidad"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field variant="underlined" :rules="required" v-model="code" label="código postal"></v-text-field>
        </v-col>
        <v-col>
          <p>Costo de envío: ${{ shippingCost }}</p>
          <v-btn @click="calculateShippingCost">CALCULAR COSTO DE ENVIO</v-btn>
        </v-col>
      </v-row>

      <v-btn type="submit" color="primary">Submit</v-btn>
      <v-progress-linear v-if="loading" indeterminate color="green"></v-progress-linear>
    </v-form>
  </v-container>
</template>

 
 <script>
 import { useAuthStore } from '../stores/store';
 import axios from 'axios';
 import Swal from 'sweetalert2';
 
 export default {
  data() {
   return {
     formData: {
       name: '',
       cellphone: '',
       adress: '',
       location: '',
     },
     code: '',
     shippingCost: 0,
     loading: false,
   };
  },
  computed: {
   required() {
     return [(value) => !!value || 'Campo requerido'];
   },
  },
  methods: {
   calculateShippingCost() {
     if (this.code > 999 && this.code < 1500) {
       this.shippingCost = 0;
     } else {
       this.shippingCost = 1500;
     }
   },
   submit() {
     const store = useAuthStore();
     const carrito = store.carrito;
 
     const token = store.userData.token
     const headers = {
       'x-token':token
     };
     console.log(headers)
     const items = carrito.map(item => {
       return {
         desc: item.product.desc,
         id: item.product.id,
         img: item.product.img,
         price: item.product.price,
         quantity: item.quantity,
         title: item.product.title
       };
     });
 
     let total = 0;
     for (const item of items) {
       total += item.price * item.quantity;
     }
     const totalCost = total + this.shippingCost
     axios.post('https://back-ecommerce-apdo8p7v1-jazqc.vercel.app/orders', {
       totalPrice: total,
       shippingCost: this.shippingCost,
       shippingDetails: {
         name: this.formData.name,
         cellphone: this.formData.cellphone,
         location: this.formData.location,
         adress: this.formData.adress
       },
       items: items,
       totalCost: totalCost
     }, { headers })
     .then((response) => {
       console.log(response);
       this.formData.name = '';
       this.formData.cellphone = "";
       this.formData.adress = "";
       this.formData.location = "";
       this.shippingCost = 0;
       this.code = '',
       store.setCarrito = [];
       Swal.fire({
  icon: 'success',
  title: 'Compra realizada con éxito!',
});
     })
     .catch((error) => {
       console.error(error);
     })
   },
  },
 };
 </script>
 

<style></style>
