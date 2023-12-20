<template >
  <v-container fluid>
    <v-item-group>
      <v-row dense justify="center">

        <v-col v-for="item in items" :key="item.id" align="center" sm="6" md="4" lg="3">

          <v-item>
            <v-card height="220px" class="d-flex flex-column align-center justify-center fill-height pa-2">
              <v-icon size="x-large" :color=item.color :icon=item.icon class="icon"></v-icon>
              <v-card-title>
                {{ item.title }}
              </v-card-title>
              <v-card-text>
                {{ item.description }}
              </v-card-text>
              <v-spacer></v-spacer>
              <v-card-actions class="justify-center">
                <v-btn @click="openForm(item)" color="primary" variant="tonal" rounded="sm" >INGRESAR</v-btn>
              </v-card-actions>
            </v-card>


            <v-dialog v-model="formDialog" max-width="500px">
              <v-card v-if="selectedItem">
                <v-card-title>
                  {{ selectedItem.title }}
                </v-card-title>
                <v-card-text>
                  <addProductForm v-if="selectedItem.id == 1"></addProductForm>
                  <editProductForm v-if="selectedItem.id == 2"></editProductForm>
                  <editStockForm v-if="selectedItem.id == 3"></editStockForm>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn @click="closeForm" color="primary" variant="tonal" rounded="sm">Cancelar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-item>

        </v-col>
      </v-row>

    </v-item-group>
  </v-container>
  <v-divider class="border-opacity-25"></v-divider>
  <div class="data_container">
    <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Search" single-line hide-details solo>
    </v-text-field>
    <v-data-table height="400px" fixed-header :headers="headers" :items="products" :search="search">
    </v-data-table>
  </div>
</template>

<script>
import { ref } from 'vue';
import addProductForm from '../components/addProductForm.vue';
import editProductForm from '../components/editProductForm.vue';
import editStockForm from '../components/editStockForm.vue';
import axios from 'axios';


export default {
  components: { addProductForm, editProductForm, editStockForm },
  data() {
    return {
      formDialog: false,
      selectedItem: null,
      items: [{ id: 1, icon: "mdi-tag-plus", color: "green-darken-1", title: "Agregar nuevo producto", description: "Agregar producto a la base de datos" }, { id: 2, icon: "mdi-lead-pencil", color: "blue-darken-1", title: "Editar producto", description: "Modifica datos de un producto en la base de datos" }, { id: 3, color: "yellow-darken-1", icon: "mdi-store-alert", title: "Modificar stock", description: "Editar la cantidad de unidades de un producto con su ID" },
      ],
      search: '',
      headers: [
        {
          align: 'start',
          key: 'id',
          sortable: true,
          title: 'ID',
        },
        { key: 'title', title: 'Title' },
        { key: 'price', title: 'Precio' },
        { key: 'stock', title: 'Stock' },
      ]

    };
  },
  setup() {
    const products = ref([]);
    /**
    * Fetches product data from the data base and assigns it to the `products` value.
    */
const URL = import.meta.env.VITE_API_URL
    const loadDB = () =>
      axios.get(URL+'/products')
        .then(response => {
          products.value = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    loadDB()
    return { products, loadDB };
  },
  methods: {

    /**
     * Open and close admin functions dialogs
     */
    openForm(item) {
      this.selectedItem = item;
      this.formDialog = true;

    },
    closeForm() {
      this.formDialog = false;
      this.selectedItem = null;
      this.loadDB()
    }
  }
};
</script>
<style>
div.data_container {
  padding: 1em;
}
</style>