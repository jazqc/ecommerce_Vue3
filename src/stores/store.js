import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useAuthStore = defineStore('auth', {
  state: () => reactive({
    isAdminLogged: false,
    isUserLogged: false,
    userData: {}
  }),
  actions: {
    setUserData(value) {
      this.userData = Object.assign({}, value);
      this.isAdminLogged = value.rol === '50yun4sm1n';
      this.isUserLogged = value.rol === "50yunu53r";
    },
    setIsAdminLogged(value) {
      this.isAdminLogged = value;
    },
    setIsUserLogged(value) {
      this.isUserLogged = value;
    },
  },
  mutations: {
    resetUserData() {
      this.userData = {};
      this.isAdminLogged = false;
      this.isUserLogged = false;
    }
  }
});
