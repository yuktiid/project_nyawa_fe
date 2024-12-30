<!-- components/Sidebar.vue -->

<template>
  <aside :class="{ 'hidden': !showSidebar, 'md:block': showSidebar }" class="bg-gray-800 text-white h-screen w-64">
    <div class="p-4">
      <!-- Isi Sidebar di sini -->
      <h2 class="text-xl font-semibold mb-4">Sidebar</h2>
      <ul>
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about">About</nuxt-link>
        </li>
        <!-- Tambahkan item lain sesuai kebutuhan -->
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      showSidebar: true, // Atur default ke true untuk tampil di layar besar
    };
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.showSidebar = window.innerWidth >= 768; // Ganti 768 dengan ukuran breakpoint yang Anda inginkan
    },
  },
};
</script>

<style scoped>
/* Gaya styling khusus untuk Sidebar */
</style>
