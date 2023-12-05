<template v-slot:icon>

    <v-card class="mx-auto pa-8 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-right">
    <v-icon icon="mdi-close-circle-outline" color="primary" @click="this.$emit('close-dialog')"></v-icon>
  </div>
      <div v-if="showLoginForm">
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>
        <v-form ref="loginForm" @submit.prevent="submit">
          <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline" id="email"
            type="email" v-model="formData.email" :rules="emailRules" required></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Password

            <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
              Forgot login password?</a>
          </div>

          <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
            density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline" id="password"
            v-model="formData.password" :rules="passwordRules" required
            @click:append-inner="visible = !visible"></v-text-field>

          <div v-if="errors.satus === true" class="text-red">

            <v-alert color="error" variant="tonal" icon="$error" text="Alguno de los datos es incorrecto">

            </v-alert>
          </div>

          <v-btn block class="mb-8" color="primary" size="large" variant="tonal" type="submit" :loading="loading"
            @click="load">
            Log In
          </v-btn>

          <v-btn block class="mb-8 text-none text-subtitle-1" color="primary" size="large"
            @click="showSignUpForm = true, showLoginForm = false">
            No tienes cuenta? Regístrese
            <v-icon icon="mdi-chevron-right"></v-icon>
          </v-btn>
        </v-form>
      </div>

      <v-form v-if="showSignUpForm">
        <signUpForm></signUpForm>
      </v-form>
    </v-card>
</template>

<script>
import axios from 'axios';
import signUpForm from './signUpForm.vue';
import { useAuthStore } from '../stores/store';

export default {
  name: 'loginForm',
  data: () => ({
    showSignUpForm: false,
    showLoginForm: true,
    visible: false,
    errors: {
      data: [],
      satus: false,
    },
    loading: false,
    formData: {
      email: '',
      password: '',
    },
    emailRules: [
      value => !!value || 'Debe ingresar su correo electrónico'
    ],
    passwordRules: [
      value => (value && value.length >= 6) || 'La contraseña debe ser de 6 dígitos'
    ],
  }),
  components: {
    signUpForm
  },

  methods: {

    load() {
      this.loading = true
      setTimeout(() => (this.loading = false), 3000)
    },
    submit() {
      this.$refs.loginForm.validate().then(valid => {
        if (valid) {
          axios.post('https://back-ecommerce-8eh9potsi-jazqc.vercel.app/auth/login', this.formData)
            .then((response) => {
              this.formData.email = '';
              this.formData.password = '';

              const userData = {
                name: response.data.user.name,
                email: response.data.user.email,
                rol: response.data.user.rol,
                token: response.data.token
              };

              localStorage.setItem('userData', JSON.stringify(userData));
              const store = useAuthStore();
              store.setUserData(userData)
              this.$emit('close-dialog');
            })

            .catch((error) => {
              if (error.response && error.response.data && error.response.data.errors) {
                this.errors = { data: error.response.data.errors, satus: true }
                console.log(this.errors)

              } else {
                this.errors = [{ msg: 'Ha ocurrido un error, intentelo nuevamente' }];

              }
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    }
  }
}

</script>