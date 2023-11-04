import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useAuthStore = defineStore('auth', {
  state: () => reactive({
    isAdminLogged: false,
    isUserLogged: false,
    isLoggedIn: false,
    userData: {} || false
  }),
  actions: {
    setUserData(value) {
      this.userData = Object.assign({}, value);
      this.isLoggedIn = true
      this.isAdminLogged = value.rol === '50yun4sm1n';
      this.isUserLogged = value.rol === "50yunu53r";
    },
    setIsAdminLogged(value) {
      this.isAdminLogged = value;
    },
    setIsUserLogged(value) {
      this.isUserLogged = value;
    },
    setIsLoggedIn(value) {
      this.isLoggedIn = value
    }
  },
    resetUserData() {
      this.setUserData(false)
      this.setIsAdminLogged(false)
      this.setIsUserLogged(false)
      this.setIsLoggedIn(false)
  }
});
