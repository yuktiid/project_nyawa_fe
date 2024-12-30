// composables/useCart.js
import { ref, watch, computed } from 'vue';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key'; // Replace with a more secure key in a real application

const cart = ref([]);

// Function to encrypt data
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Function to decrypt data
const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Load data from localStorage
if (process.client && localStorage.getItem('cart')) {
  try {
    const encryptedCart = localStorage.getItem('cart');
    cart.value = decryptData(encryptedCart);
  } catch (error) {
    console.error('Failed to decrypt cart data:', error);
  }
}

// Watch cart changes and update localStorage
watch(cart, (newCart) => {
  if (process.client) {
    try {
      const encryptedCart = encryptData(newCart);
      localStorage.setItem('cart', encryptedCart);
    } catch (error) {
      console.error('Failed to encrypt cart data:', error);
    }
  }
}, { deep: true });

export function useCart() {
  const addToCart = (product) => {
    const existingItem = cart.value.find(
      (item) => item.id_produk === product.id_produk && item.size === product.size
    );

    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      cart.value.push(product);
    }
  };

  const removeProduct = (index) => {
    cart.value.splice(index, 1);
  };

  const cartItemCount = computed(() => cart.value.length);

  return {
    cart,
    addToCart,
    removeProduct,
    cartItemCount
  };
}
