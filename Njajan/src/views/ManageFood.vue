<template>
  <div class="container">
    <h2>Manage Food</h2>

    <!-- Action buttons for user choices -->
    <div class="action-buttons">
      <button class="button button-add" @click="showAddForm">Add Product</button>
      <button class="button button-edit" @click="showEditForm">Edit Product</button>
      <button class="button button-delete" @click="showDeleteForm">Delete Product</button>
      <router-link :to="{ name: 'Foods' }" class="button">View Food List</router-link>
    </div>

    <!-- Form for adding a new product -->
    <form v-if="showAdd" class="form-product" @submit.prevent="addProduct">
      <label for="productName">Product Name:</label>
      <input type="text" id="productName" v-model="newProduct.name" required>

      <label for="productPrice">Product Price:</label>
      <input type="number" id="productPrice" v-model="newProduct.price" required>

      <button type="submit" class="button button-add">Add Product</button>
    </form>

    <!-- Form for editing a product -->
    <form v-if="showEdit" class="form-product" @submit.prevent="editProduct">
      <label for="editProductName">Product Name:</label>
      <input type="text" id="editProductName" v-model="editedProduct.name" required>

      <label for="editProductPrice">Product Price:</label>
      <input type="number" id="editProductPrice" v-model="editedProduct.price" required>

      <button type="submit" class="button button-edit">Edit Product</button>
    </form>

    <!-- Form for deleting a product -->
    <form v-if="showDelete" class="form-product" @submit.prevent="deleteProduct">
      <label for="productId">Select Product to Delete:</label>
      <select id="productId" v-model="selectedProductId" required>
        <option v-for="product in products" :key="product.id" :value="product.id">
          {{ product.name }}
        </option>
      </select>

      <button type="submit" class="button button-delete">Delete Product</button>
    </form>

    <!-- List of products (for viewing) -->
    <ul v-if="showList" class="table-products">
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - {{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import dataService from '@/services/dataService';

export default {
  data() {
    return {
      products: [],
      newProduct: {
        name: '',
        price: 0,
      },
      showAdd: false,
      showEdit: false,
      showDelete: false,
      showList: false,
      selectedProductId: null,
      editedProduct: { name: '', price: 0 },
    };
  },
  async created() {
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await dataService.getProducts();
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },

    async addProduct() {
      try {
        const response = await dataService.addProduct(this.newProduct);
        this.products.push(response.data);
        this.resetForm();
        this.showList = true;

        // Show success notification
        alert('Product added successfully!');

        // Ask user if they want to view the updated food list
        if (confirm('Do you want to view the updated food list?')) {
          this.showProductList();
        }

        // Fetch products to update the product list
        await this.fetchProducts();
      } catch (error) {
        console.error('Error adding product:', error);
        alert('Error adding product. Please try again.');
      }
    },

    // Method to edit a product
    async editProduct() {
      try {
        const productId = this.selectedProductId;

        if (!productId) {
          alert('Please select a product to edit.');
          return;
        }

        const response = await dataService.editProduct(productId, this.editedProduct);
        const updatedProductIndex = this.products.findIndex(product => product.id === productId);

        // Update the product in the local data
        this.$set(this.products, updatedProductIndex, response.data);

        // Reset editedProduct and hide the edit form
        this.editedProduct = { name: '', price: 0 };
        this.showList = true;

        // Show success notification
        alert('Product edited successfully!');

        // Fetch products to update the product list
        await this.fetchProducts();
      } catch (error) {
        console.error('Error editing product:', error);
        alert('Error editing product. Please try again.');
      }
    },

    // Method to delete a product
    async deleteProduct() {
      try {
        const productId = this.selectedProductId;

        if (!productId) {
          alert('Please select a product to delete.');
          return;
        }

        await dataService.deleteProduct(productId);
        this.products = this.products.filter(product => product.id !== productId);

        // Reset selectedProductId and hide the delete form
        this.selectedProductId = null;
        this.showList = true;

        // Show success notification
        alert('Product deleted successfully!');

        // Fetch products to update the product list
        await this.fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      }
    },

    // Method to reset the form
    resetForm() {
      this.newProduct = {
        name: '',
        price: 0,
      };
    },
    // Methods to toggle visibility of forms based on user choice
    showAddForm() {
      this.resetForm();
      this.showAdd = true;
      this.showEdit = false;
      this.showDelete = false;
      this.showList = false;
    },
    showEditForm() {
      // Implement logic for showing edit form
      this.showEdit = true;
      this.showAdd = false;
      this.showDelete = false;
      this.showList = false;
    },
    showDeleteForm() {
      // Implement logic for showing delete form
      this.showDelete = true;
      this.showAdd = false;
      this.showEdit = false;
      this.showList = false;
    },
    // Method to show the list of products
    showProductList() {
      this.showAdd = false;
      this.showEdit = false;
      this.showDelete = false;
      this.showList = true;
    },
  },
};
</script>

<style scoped>
/* Container utama */
.container {
  padding: 20px;
}

/* Tabel produk */
.table-products {
  width: 100%;
  border-collapse: collapse;
}

.table-products th,
.table-products td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.table-products th {
  background-color: #f4f4f4;
}

/* Tombol aksi */
.button {
  padding: 6px 12px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-add {
  background-color: #4CAF50;
  color: white;
}

.button-edit {
  background-color: #FFC107;
  color: black;
}

.button-delete {
  background-color: #F44336;
  color: white;
}

/* Formulir untuk menambah atau mengedit produk */
.form-product {
  margin-top: 20px;
}

.form-product input,
.form-product select,
.form-product textarea {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-product input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-product input[type=submit]:hover {
  background-color: #45a049;
}
</style>
