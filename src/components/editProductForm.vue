<template>
    <v-form @submit.prevent="submitForm" class="justify-center">
        <v-text-field v-model="formData.id" label="ID" :rules="[rules.required]"></v-text-field>
        <v-text-field v-model="formData.title" label="Title"></v-text-field>
        <v-text-field v-model="formData.desc" label="Description"></v-text-field>
        <v-text-field v-model="formData.img" label="Image URL"></v-text-field>
        <v-text-field v-model="formData.price" label="Price"></v-text-field>

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
        },
        rules: {
            required: value => !!value || 'El ID es requerido',
        },
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
            const URL = import.meta.env.VITE_API_URL
            const editedFields = {};
            for (const key in this.formData) {
                if (this.formData[key]) {
                    editedFields[key] = this.formData[key];
                }
            }

            axios.patch(URL+'/products/changeProduct', editedFields, { headers })
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
                    this.isLoading = false;
                });
        },
    }
}
</script>