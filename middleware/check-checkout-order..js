export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    // Wrap the logic in a requestAnimationFrame to ensure client-side execution
    window.requestAnimationFrame(() => {
      const checkoutOrder = localStorage.getItem('checkoutOrder');

      if (!checkoutOrder) {
        // Redirect to homepage if 'checkoutOrder' doesn't exist
        return navigateTo('/');
      }
    });
  }
});
