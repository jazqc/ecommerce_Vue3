<template>
    <v-form @submit.prevent="submitForm" class="justify-center">
        <v-text-field v-model="formData.id" label="ID" :rules="[rules.required]"></v-text-field>
        <v-text-field v-model="formData.title" label="Title" :rules="[rules.required]"></v-text-field>
        <v-text-field v-model="formData.desc" label="Description" :rules="[rules.required]"></v-text-field>
        <v-text-field v-model="formData.img" label="Image URL" :rules="[rules.required]"></v-text-field>
        <v-text-field v-model="formData.price" label="Price" :rules="[rules.required]"></v-text-field>
        <v-text-field v-model="formData.stock" label="Stock" :rules="[rules.required]"></v-text-field>
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
            title: '',
            desc: '',
            img: '',
            price: '',
            stock: ''
        },
        rules: {
            required: value => !!value || 'Campo requerido',
        },
    }),

    methods: {
        load() {
            this.loading = true;
        },
        submitForm() {
            const store = useAuthStore();
            const token = store.userData.token
            const headers = {
                'x-token': token
            };

            const { id, title, desc, img, price, stock } = this.formData
            axios.post('https://back-ecommerce-apdo8p7v1-jazqc.vercel.app/products', this.formData, { headers })
                .then((response) => {
                    console.log(response);
                    this.formData.id = '';
                    this.formData.title = "";
                    this.formData.desc = "";
                    this.formData.img = "";
                    this.formData.price = "";
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