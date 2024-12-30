<template>
  <div>
    <div class="m-0 p-0">
      <!-- Section for images -->
      <section class="flex h-96 md:h-full">
        <div class="w-1/2">
          <NuxtImg src="/img1.jpeg" alt="Image 1" class="w-full h-full object-cover" />
        </div>
        <div class="w-1/2">
          <NuxtImg src="/img2.jpeg" alt="Image 2" class="w-full h-full object-cover" />
        </div>
      </section>

      <!-- New product button -->
      <div class="flex justify-center items-center my-3 md:my-10">
        <nuxt-link :to="{ name: 'belanja' }"
          class="flex justify-center items-center rounded uppercase text-md md:text-lg font-semibold px-9 py-3 md:px-10 md:py-3 bg-slate-900 text-white">
          new product
        </nuxt-link>
      </div>

      <!-- Advertisement banner -->
      <div class="flex ad-banner relative overflow-hidden md:my-4 md:h-80 h-56">
        <div class="relative w-2/4 h-full border-0">
          <img class="w-full h-full object-cover object-top" src="/img3.jpeg" alt="Gambar Iklan" />
          <div class="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent"></div>
        </div>
        <div class="relative w-1/2 h-full bg-black text-white border-0 grid content-center justify-center">
          <p class="text-2xl md:text-4xl mb-2">Get Discount</p>
          <div class="flex items-start mb-6">
            <p class="text-lg md:text-2xl">up to</p>
            <h2 class="text-5xl md:text-7xl font-bold ml-1">35%</h2>
          </div>
          <NuxtLink :to="{name: 'promo'}"
            class="rounded-lg capitalize text-md md:text-lg font-semibold py-2 px-4 w-32 md:w-auto bg-white text-black md:ms-12 text-center">
            check now
          </NuxtLink>
        </div>
      </div>

      <!-- Display categories -->
      <div>
        <LayoutsKategori />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


// Mengatur meta tag
useHead({
  title: 'Beranda',
})


</script>


<style scoped>
/* Styling khusus untuk komponen iklan */
.bg-gradient-to-r {
  background: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
</style>
