<template>
    <v-form @submit.prevent="submitForm" class="justify-center">
        <v-text-field v-model="formData.id" label="ID" :rules="[rules.required]"></v-text-field>
        <v-text-field v-model="formData.title" label="Title"></v-text-field>
        <v-text-field v-model="formData.desc" label="Description"></v-text-field>
        <v-text-field v-model="formData.img" label="Image URL"></v-text-field>
        <v-text-field v-model="formData.price" label="Price"></v-text-field>

        <v-btn block type="submit" color="primary" @click="load">Submit</v-btn>
        <br>
        <v-progress-linear v-if="loading" indeterminate color="green"></v-progress-linear>

    </v-form>
</template>
  
<script>
import { useAuthStore } from '../stores/store';
import axios from 'axios';
export default {

    data: () => ({
        rules: {
            required: value => !!value || 'El ID es requerido',
        },
        loading: false,
        formData: {
            id: '',
            title: '',
            desc: '',
            img: '',
            price: '',
        }
    }),
    methods: {
        load() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 3000);
        },
        submitForm() {
            const store = useAuthStore();
            const token = store.userData.token
            const headers = {
                'x-token': token
            };
            const editedFields = {};
            for (const key in this.formData) {
                if (this.formData[key]) {
                    editedFields[key] = this.formData[key];
                }
            }

            axios.patch('https://back-ecommerce-apdo8p7v1-jazqc.vercel.app/products/changeProduct', editedFields, { headers })
                .then((response) => {
                    console.log(response);
                    this.formData.id = '';
                    this.formData.title = "";
                    this.formData.desc = "";
                    this.formData.img = "";
                    this.formData.price = "";

                })
                .catch((error) => {
                    console.error(error);

                })
                .finally(() => {
                    this.loading = false;
                });
        },
    }
}
</script>