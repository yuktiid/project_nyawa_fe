// composables/useForm.js
import { ref, watch } from 'vue';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key'; // Replace with a more secure key in a real application

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export function useForm() {
  const formData = ref({
    email: '',
    no_telp: '',
    name: '',
    selectedCity: '',
    postalCode: '',
    address: ''
  });

  // Function to load saved data from localStorage
  const loadFormData = () => {
    if (typeof window !== 'undefined') { // Check if on client
      try {
        const encryptedData = localStorage.getItem('formData');
        if (encryptedData) {
          const savedData = decryptData(encryptedData);
          formData.value = savedData;
        }
      } catch (error) {
        console.error('Failed to decrypt form data:', error);
      }
    }
  };

  // Watcher to save the entire formData object to localStorage
  watch(formData, (newVal) => {
    if (typeof window !== 'undefined') { // Check if on client
      try {
        const encryptedData = encryptData(newVal);
        localStorage.setItem('formData', encryptedData);
      } catch (error) {
        console.error('Failed to encrypt form data:', error);
      }
    }
  }, { deep: true });

  // Call loadFormData on initialization to load saved data
  loadFormData();

  return {
    formData
  };
}
