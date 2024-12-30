export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    // Wrap the logic in a requestAnimationFrame to ensure client-side execution
    window.requestAnimationFrame(() => {
      const authData2 = localStorage.getItem("authData");

      if (authData2) {
        // Redirect to homepage if 'checkoutOrder' doesn't exist
        return navigateTo("/users");
      }
    });
  }
});
