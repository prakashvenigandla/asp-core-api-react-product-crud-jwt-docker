import axios from 'axios';
import AuthService from './AuthService';
const API_URL = 'https://obscure-winner-77wvjp94rvv3p54w-5106.app.github.dev/api/products'; // Adjust the URL as necessary

class ProductService {
  getHeaders() {
    const token = AuthService.getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  getProducts() {
    return axios.get(API_URL, this.getHeaders());
  }

  getProduct(id) {
    return axios.get(`${API_URL}/${id}`, this.getHeaders());
  }

  addProduct(product) {
    return axios.post(API_URL, product, this.getHeaders());
  }

  updateProduct(id, product) {
    return axios.put(`${API_URL}/${id}`, product, this.getHeaders());
  }

  deleteProduct(id) {
    return axios.delete(`${API_URL}/${id}`, this.getHeaders());
  }
}

export default new ProductService();
