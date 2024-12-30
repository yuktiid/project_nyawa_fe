export default defineNuxtConfig({
  devtools: { disabled: true },
  modules: ['@nuxtjs/tailwindcss', "@nuxt/image","nuxt-icon"],
  imports: {
    autoImport: true
  },
  runtimeConfig: {
    public: {
      api_development_url: 'http://localhost:4000',
      laravel: 'http://127.0.0.1:8000',
      Api_key: '8a224c4dc8ec162d866a8cefd4cc553dced1f3dec2fc71102a69256aa34072d7'
    },
  },
  compatibilityDate: '2024-09-02',
  plugins: [
    '~/plugins/sweetalert2.js', // Menambahkan plugin SweetAlert2
  ],
})


