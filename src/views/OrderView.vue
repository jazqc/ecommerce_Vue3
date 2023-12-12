<template>
  <v-container>
    <v-form @submit.prevent="submit">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field variant="underlined" v-model="formData.name" :rules="[rules.required]"
            label="Nombre y apellido"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field variant="underlined" v-model="formData.cellphone" :rules="[rules.required]"
            label="Número de celular"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field variant="underlined" v-model="formData.adress" :rules="[rules.required]"
            label="Dirección de envio"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field variant="underlined" v-model="formData.location" :rules="[rules.required]"
            label="Localidad"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field variant="underlined"  v-model="code" :rules="[rules.required]" label="código postal" ></v-text-field>
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
  <div v-if="success">

<v-alert color="success" variant="tonal" icon="$success" text="Compra realizada con éxito, puede hacer el seguimiento desde 'Mis compras' ">
</v-alert>
</div>
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
     rules: {
            required: value => !!value || 'Campo requerido',
     },
     code: '',
     shippingCost: 0,
     loading: false,
     success: false,
   };
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
     const URL = import.meta.env.VITE_API_URL

  
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
     axios.post(URL+'/orders', {
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
       store.carrito = [];
       localStorage.removeItem("carrito");
       this.success = true;
       setTimeout(() => { this.success = false; }, 3000);
     })
     .catch((error) => {
       console.error(error);
     })
   },
  },
 };
 </script>
 

<style></style>
