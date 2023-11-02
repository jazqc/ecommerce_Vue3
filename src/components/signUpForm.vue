<template>
    <v-card
      class="w-100"
      max-width="600"
      rounded="lg"
      flat
      plain
    >
      <v-form @submit.prevent="submit" v-if="showSignUpForm">
        <div class="text-subtitle-1 text-medium-emphasis custom-form">Nombre</div>
          
        <v-text-field
          density="compact"
          placeholder="nombre"
          id="name"
          v-model="formData.name"
          required
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis">Email</div>
        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          id="email"
          type="email" 
          v-model="formData.email"
          required
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password
        </div>
  
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          id="password"
          v-model="formData.password"
          required
          @click:append-inner="visible = !visible"
        ></v-text-field>
  
        <v-btn block class="mb-8" color="blue" size="large" variant="tonal" type="submit">
          <template v-if="isLoading">
            <v-progress-circular indeterminate color="green"></v-progress-circular>
          </template>
          <template v-else>
            Registrarse
          </template>
        </v-btn>
      </v-form>
  
      <div v-if="userCode">
        <v-form @submit.prevent="submitCode">
          <div class="text-subtitle-1 text-medium-emphasis">Revise su casilla e ingrese el código de verificación</div>
          <v-text-field
            density="compact"
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            id="email"
            type="email" 
            v-model="formDataCode.email"
            required
          ></v-text-field>
          <v-text-field
            density="compact"
            placeholder="Código de verificación"
            id="code"
            v-model="formDataCode.code"
            required
          ></v-text-field>
        
      <v-btn block class="mb-8" color="blue" size="large" variant="tonal" type="submitCode">Enviar</v-btn>
    
    </v-form>
</div>
    </v-card>
  </template>
  

  <script>
  import axios from 'axios';

export default {
  name: 'signUpForm',
  data: () => ({
        isLoading: false,
      visible: false,
      userCode: false,
      showSignUpForm: true,
      formData: {
        name: '',
      email: '',
      password: '',
    },
        formDataCode: {
    email: '',
      code: '',
        }
    }),

  methods: {
    submit() {
      this.isLoading = true;
      const { name, email, password} = this.formData
      axios.post('https://back-ecommerce-apdo8p7v1-jazqc.vercel.app/auth/register', this.formData)
      .then((response) => {
          console.log(response);
          this.formData.name = '';
          this.formData.email = '';
          this.formData.password = '';
          this.isLoading= false;
          this.showSignUpForm = false;
          this.userCode = true
        })
        .catch((error) => {
    console.error(error);

  });
    },

    //ESTO AUN NO FUNCIONA: hay que ver el token para verificar al usuario correcto y sacarle el form de arriba
  submitCode() {
    const { email, code} = this.formDataCode
    axios.patch('https://back-ecommerce-apdo8p7v1-jazqc.vercel.app/auth/verify', this.formDataCode)
      .then((response) => {
          console.log("ok")
          this.formDataCode.email = '';
          this.formDataCode.code = '';
          this.isLoading= false;
          this.showSignUpForm = false;
        })
        .catch((error) => {
    console.error(error);

  })
  }
  }

  
}

    
  </script>

  <style scoped>
  .custom-form {
    width: 500px ;
  font-size: 18px;
}
  </style>