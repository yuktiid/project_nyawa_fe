// services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000', // Sesuaikan dengan URL server Express Anda
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
