<template>
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
        
      <v-btn block class="mb-8 text-none text-subtitle-1" color="primary" size="large" type="submitCode">
        <template v-if="isLoading">
            <v-progress-circular indeterminate color="green"></v-progress-circular>
          </template>
          <template v-else>
            Enviar
          </template>
      </v-btn>
      <v-alert
      v-if="error"
  color="error"
  icon="$error"
  variant="tonal"
>{{ errorMsgText }}</v-alert>
<v-alert
      v-if="success"
  color="success"
  icon="$success"
  variant="tonal"
  text="Su usuario ha sido verificado"
></v-alert>
    </v-form>

</template>

<script>
import axios from 'axios';

export default {
  name: 'verifyCode',
  data: () => ({
    isLoading: false,
    error: false,
    success: false,
    errorMsgText: '',
    formDataCode: {
    email: '',
      code: '',
        }
    }),

  methods:    {
  submitCode() {
    this.isLoading= true;
    const { email, code} = this.formDataCode
    axios.patch('https://back-ecommerce-8eh9potsi-jazqc.vercel.app/auth/verify', this.formDataCode)
      .then((response) => {
          console.log("ok")
          this.success = true;
          this.formDataCode.email = '';
          this.formDataCode.code = '';
          this.isLoading= false;
        
        })
        .catch((error) => {
    console.error(error);

            this.error = true
            this.errorMsgText = error.response.data.msg
            this.isLoading= false;


  })
  }
}
}

</script>

<style>

</style>