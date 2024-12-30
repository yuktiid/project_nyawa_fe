import { ref } from 'vue';

const user = ref(null);

export function useUser() {
  const loadUserFromSession = () => {
    if (process.client) {
      const userData = JSON.parse(sessionStorage.getItem('user'));
      if (userData) {
        user.value = userData;
      }
    }
  };

  const setUser = (userData) => {
    if (process.client) {
      user.value = userData;
      sessionStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    if (process.client) {
      sessionStorage.removeItem('user');
    }
    user.value = null;
  };

  return {
    user,
    loadUserFromSession,
    setUser,
    logout,
  };
}
