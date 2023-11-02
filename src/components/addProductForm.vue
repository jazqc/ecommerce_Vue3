<template>
    <v-form @submit="submitForm" class="justify-center">
      <v-text-field v-model="formData.id" label="ID"></v-text-field>
      <v-text-field v-model="formData.title" label="Title"></v-text-field>
      <v-text-field v-model="formData.desc" label="Description"></v-text-field>
      <v-text-field v-model="formData.img" label="Image URL"></v-text-field>
      <v-text-field v-model="formData.price" label="Price"></v-text-field>
      <v-text-field v-model="formData.stock" label="Stock"></v-text-field>
      <v-btn block type="submit" color="primary">Submit</v-btn>
    </v-form>
  </template>
  
  <script>
  export default {
    data: () => ({

        formData: {
    id: '',
    title: '',
    desc: '',
    img: '',
    price: '',
    stock: ''
        }
    }),
    methods: {
      submitForm() {
        console.log(this.formData);
      }
    }
  };
  </script>