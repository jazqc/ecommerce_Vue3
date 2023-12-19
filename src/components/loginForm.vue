<template v-slot:icon>

    <v-card class="mx-auto pa-8 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-right">
    <v-icon icon="mdi-close-circle-outline" color="primary" @click="this.$emit('close-dialog')"></v-icon>
  </div>
      <div v-if="showLoginForm">
        <div class="text-subtitle-1 text-medium-emphasis">Email</div>
        <v-form ref="loginForm" @submit.prevent="submit">
          <v-text-field density="compact" placeholder="Ingrese su correo" prepend-inner-icon="mdi-email-outline" id="email"
            type="email" v-model="formData.email" :rules="emailRules" required></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Contraseña

            <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
              Olvidó su contraeña?</a>
          </div>

          <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
            density="compact" placeholder="Ingrese contraseña" prepend-inner-icon="mdi-lock-outline" id="password"
            v-model="formData.password" :rules="passwordRules" required
            @click:append-inner="visible = !visible"></v-text-field>

          <div v-if="errors.satus === true" class="text-red">

            <v-alert class="custom-alert" color="error" variant="tonal" icon="$error">{{ errors.msg }}

            </v-alert>
          </div>

          <v-btn block class="mb-8" color="primary" size="large" variant="tonal" type="submit" :loading="loading"
            @click="load">
            Iniciar sesión
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
      msg: ''
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
      const URL = import.meta.env.VITE_API_URL
      this.$refs.loginForm.validate().then(valid => {
        if (valid) {
          axios.post(URL+'/auth/login', this.formData)
            .then((response) => {
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
              if (error) {
                this.errors = { data: error.response.data.errors, satus: true, msg: error.response.data.msg ? error.response.data.msg : 'Hay errores en el formulario, verifique sus datos'   }
                console.log(error.response.data.msg)

              } else {
                this.errors = [{ msg: 'Ha ocurrido un error, intentelo nuevamente' }];

              }
            })
            .finally(() => {
              this.loading = false;
              this.formData.email = '';
              this.formData.password = '';
            });
        }
      });
    }
  }
}

</script>

<style scoped>
.custom-alert {
 font-size: 14px;
}
</style>