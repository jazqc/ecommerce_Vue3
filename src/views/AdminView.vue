<template >
    <v-container fluid>
        <v-item-group>
            <v-row dense justify="center" >

<v-col
  v-for="item in items"
  :key="item.id"
  align="center"
  sm="6"
md="4"
lg="3"
>

<v-item>
    <v-card height="200px">
        <v-icon
        size="x-large"
      :color=item.color
      :icon=item.icon
      class="icon"
    ></v-icon>
      <v-card-title>
        {{item.title}}
      </v-card-title>
      <v-card-text>
        {{ item.description }}
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn @click="openForm(item)" color="primary" variant="tonal" rounded="sm">Open Form</v-btn>
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
<v-table height="400px" fixed-header class="custom-table">
    <thead class="header">
      <tr class="header">
        <th class="text-left">
          ID
        </th>
        <th class="text-left">
          Título
        </th>
        <th class="text-left">
          Precio
        </th>
        <th class="text-left">
         Stock
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="product in products"
        :key="product.id"
        
      >
        <td>{{ product.id }}</td>
        <td>{{ product.title }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.stock }}</td>
      </tr>
    </tbody>
  </v-table>
  </template>
  
  <script>
  import { ref } from 'vue';
  import addProductForm from '../components/addProductForm.vue';
import editProductForm from '../components/editProductForm.vue';
import editStockForm from '../components/editStockForm.vue';


  export default {
  components: { addProductForm, editProductForm, editStockForm },
    data() {
      return {
        formDialog: false,
        selectedItem: null,
        items: [{id: 1, icon: "mdi-tag-plus", color: "green-darken-1", title: "Agregar nuevo producto", description: "Agregar producto a la base de datos"}, {id: 2, icon: "mdi-lead-pencil", color: "blue-darken-1", title: "Editar producto", description: "Modifica datos de un producto en la base de datos"}, {id: 3, color: "yellow-darken-1", icon: "mdi-store-alert", title: "Modificar stock", description: "Editar la cantidad de unidades de un producto con su ID"}
    ]
      };
    },
    setup() {
    const products = ref([]);

    fetch('https://back-ecommerce-1wni1lbxi-jazqc.vercel.app/products')
      .then(response => response.json())
      .then(data => products.value = data.data);

    return { products };
  },
    methods: {
      openForm(item) {
        this.selectedItem = item;
        this.formDialog = true;
      },
      closeForm() {
        this.formDialog = false;
        this.selectedItem = null;

      },
      submitForm() {
        // Handle form submission logic
        this.formDialog = false;
      }
    }
  };
  </script>
  <style>
thead.header {
font-size: 1.5em;
}
</style>