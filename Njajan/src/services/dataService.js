// src/services/dataService.js
import apiClient from '../apiClient';

const endpoint = '/products'; // Sesuaikan dengan endpoint data Anda

export default {
  getProducts() {
    return apiClient.get(endpoint);
  },
  getProduct(id) {
    return apiClient.get(`${endpoint}/${id}`);
  },
  addProduct(product) {
    return apiClient.post(endpoint, product);
  },
  updateProduct(id, product) {
    return apiClient.put(`${endpoint}/${id}`, product);
  },
  deleteProduct(id) {
    return apiClient.delete(`${endpoint}/${id}`);
  }
};
