// ~/composables/useCheckout.js
import CryptoJS from "crypto-js";
const SECRET_KEY = "your-secret-key";
export function useCheckout() {
  const checkoutNow = (orderData) => {
    try {
      const jsonData = JSON.stringify(orderData);
      const encryptedData = CryptoJS.AES.encrypt(
        jsonData,
        SECRET_KEY
      ).toString();
      localStorage.setItem("checkoutOrder", encryptedData);
    } catch (error) {
      console.error("Error saat menyimpan data ke localStorage:", error);
    }
  };

  const retrieveCheckoutData = () => {
    try {
      const encryptedData = localStorage.getItem("checkoutOrder");

      if (encryptedData) {
        const decryptedData = CryptoJS.AES.decrypt(
          encryptedData,
          SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const clearCheckoutData = () => {
    try {
      localStorage.removeItem("checkoutOrder");
    } catch (error) {
      console.error("Error saat menghapus data dari localStorage:", error);
    }
  };

  return {
    checkoutNow,
    retrieveCheckoutData,
    clearCheckoutData,
  };
}
