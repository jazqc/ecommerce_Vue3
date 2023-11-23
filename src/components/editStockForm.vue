<template>
    <v-form @submit.prevent="submitForm" class="justify-center">
        <v-text-field v-model="formData.id" label="ID" :rules="[idRules.required]"></v-text-field>
        <v-text-field v-model="formData.stock" label="Stock" :rules="[stockRules.number]"></v-text-field>
        <v-btn block type="submit" color="primary" @click="load">Submit</v-btn>
        <br>
        <v-progress-linear v-if="isLoading" indeterminate color="green"></v-progress-linear>
    </v-form>
</template>
  
<script>
import { useAuthStore } from '../stores/store';
import axios from 'axios';
export default {
    data: () => ({
        isLoading: false,
        formData: {
            id: '',
            stock: ''
        },
        idRules:
        {
            required: value => !!value || 'Debe ingresar el ID'
        },
        stockRules:
        {
            number: value => !isNaN(value) || 'Debe ingresar un valor numerico'
        }

    }),
    methods: {
        load() {
            this.isLoading = true;
        },
        submitForm() {
            const store = useAuthStore();
            const token = store.userData.token
            const headers = {
                'x-token': token
            };
            const { id, stock } = this.formData
            axios.patch('https://back-ecommerce-apdo8p7v1-jazqc.vercel.app/products/changeStock', this.formData, { headers })
                .then((response) => {
                    console.log(response);
                    this.formData.id = '';
                    this.formData.stock = '';

                })
                .catch((error) => {
                    console.error(error);

                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    }
}
</script>
