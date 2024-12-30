import CryptoJS from "crypto-js";
const SECRET_KEY = "your-secret-key";
export function useTokens() {
  const saveToken = (token, email) => {
    try {
      const authData = {
        token: token,
        email: email,
      };
      const jsonData = JSON.stringify(authData);
      const encryptedData = CryptoJS.AES.encrypt(
        jsonData,
        SECRET_KEY
      ).toString();
      localStorage.setItem("authData", encryptedData);
    } catch (error) {
      console.error("Error saat menyimpan data ke localStorage:", error);
    }
  };

  const retrieveToken = () => {
    try {
      const encryptedAuthData = localStorage.getItem("authData");
      if (encryptedAuthData) {
        const decryptedData = CryptoJS.AES.decrypt(
          encryptedAuthData,
          SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
      }else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  const clearTokenData = () => {
    try {
      localStorage.removeItem("authData");
    } catch (error) {
      console.error("Error saat menghapus data dari localStorage:", error);
    }
  };
  return {
    saveToken,
    retrieveToken,
    clearTokenData,
  };
}
