<template>
  <v-card class="w-100" max-width="600" rounded="lg" flat plain>
    <v-form @submit.prevent="submit" v-if="showSignUpForm">
      <div class="text-subtitle-1 text-medium-emphasis custom-form">Nombre</div>

      <v-text-field density="compact" placeholder="Ingrese su nombre" id="name" v-model="formData.name" :rules="nameRules"
        required></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Email</div>
      <v-text-field density="compact" placeholder="Ingrese dirección de email" prepend-inner-icon="mdi-email-outline" id="email"
        type="email" v-model="formData.email" :rules="emailRules" required></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Contraseña
      </div>

      <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
        density="compact" placeholder="Ingrese contraseña" prepend-inner-icon="mdi-lock-outline" id="password"
        v-model="formData.password" :rules="passwordRules" required
        @click:append-inner="visible = !visible"></v-text-field>

      <v-btn block class="mb-8" color="primary" size="large" variant="tonal" type="submit">
        <template v-if="isLoading">
          <v-progress-circular indeterminate color="green"></v-progress-circular>
        </template>
        <template v-else>
          Registrarse
        </template>
      </v-btn>
      <div v-if="error">

        <v-alert color="error" variant="tonal" icon="$error" text="Alguno de los datos es incorrecto">
        </v-alert>
      </div>
    </v-form>
    <div v-if="userCode">
      <verifyCode></verifyCode>
    </div>
  </v-card>
</template>
  

<script>
import axios from 'axios';
import verifyCode from './verifyCode.vue';

export default {
  components: { verifyCode },
  name: 'signUpForm',
  data: () => ({
    isLoading: false,
    visible: false,
    userCode: false,
    showSignUpForm: true,
    error: false,
    formData: {
      name: '',
      email: '',
      password: '',
    },
    nameRules: [
      value => !!value || 'Debe ingresar su nombre'
    ],
    emailRules: [
      value => !!value || 'Debe ingresar un correo electrónico'
    ],
    passwordRules: [
      value => (value && value.length >= 6) || 'La contraseña debe ser de 6 dígitos'
    ],
  }),

  methods: {
    submit() {
      this.isLoading = true;
      const { name, email, password } = this.formData
      const URL = import.meta.env.VITE_API_URL
      axios.post(URL+'/auth/register', this.formData)
        .then((response) => {
          this.formData.name = '';
          this.formData.email = '';
          this.formData.password = '';
          this.isLoading = false;
          this.showSignUpForm = false;
          this.userCode = true
        })
        .catch((error) => {
          console.error(error);
          this.error = true

        })
        .finally(() => {
          this.isloading = false;
        });
    },

  }


}


</script>

<style scoped>
.custom-form {
  width: 500px;
  font-size: 18px;
}
</style>