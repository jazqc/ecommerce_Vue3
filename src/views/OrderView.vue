<template>
    <v-container>
<v-form @submit.prevent>
<v-row>
      <v-col cols="12" md="6">
    <v-text-field
    variant="underlined"
        v-model="name"
        :rules="required"
        label="Nombre y apellido"
      ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
      <v-text-field
      variant="underlined"
        v-model="cellphone"
        :rules="required"
        label="Número de celular"
      ></v-text-field>
    </v-col>
</v-row>

<v-row>
      <v-col cols="12" md="6">
      <v-text-field
      variant="underlined"
        v-model="adress"
        :rules="required"
        label="Dirección de envio"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
      variant="underlined"
        v-model="location"
        :rules="required"
        label="Localidad"
      ></v-text-field>
    </v-col>
</v-row>
<v-row>
      <v-col cols="12" md="6">
      <v-text-field
      variant="underlined"
      :rules="required"
        v-model="code"
        label="código postal"
      ></v-text-field>
    </v-col>
    <v-col>
        <p>Costo de envío: ${{ shippingCost }}</p>
      <v-btn @click="calculateShippingCost">CALCULAR COSTO DE ENVIO</v-btn>  
    </v-col>
</v-row>

<v-btn type="submit" color="primary" @click="load">Submit</v-btn>
<v-progress-linear v-if="loading" indeterminate color="green"></v-progress-linear>
</v-form>
</v-container>
</template>

<script>
import { ref, computed } from 'vue';
export default {
    setup() {
    const name = ref('');
    const cellphone = ref('');
    const adress = ref('');
    const location = ref('');
    const code = ref('');
    const shippingCost = ref(0);
    const loading = ref(false)
    const required = computed(() => [(value) => !!value || 'Campo requerido']);

function calculateShippingCost() {
    if (code.value > 999 && code.value < 1500) {
        shippingCost.value = 0 
    }
    else shippingCost.value = 1500
}
function load() {
            loading.value = true;
            setTimeout(() => {
                loading.value = false;
            }, 3000);
        }
return {
      name,
      cellphone,
      adress,
      location,
      code,
      shippingCost,
      calculateShippingCost,
      required,
      load
    };
  },
};
</script>

<style>

</style>