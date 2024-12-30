<script setup lang="ts">
useSeoMeta({
  description: 'N.Y.A.W.A merupakan busana siap pakai khusus pria. Memiliki karakter maskulin, smart casual, urban, modern, fungsional, basic with a twist.',
  ogTitle: 'Tingkatkan Level Fashionmu: Temukan Tren & Brand Terpopuler di Nyawa.com',
  ogDescription: 'N.Y.A.W.A merupakan busana siap pakai khusus pria. Memiliki karakter maskulin, smart casual, urban, modern, fungsional, basic with a twist.',
  ogImage: '/logo.png',
  ogUrl: '[og:url]',
  twitterTitle: 'Tingkatkan Level Fashionmu: Temukan Tren & Brand Terpopuler di Nyawa.com',
  twitterDescription: 'N.Y.A.W.A merupakan busana siap pakai khusus pria. Memiliki karakter maskulin, smart casual, urban, modern, fungsional, basic with a twist.',
  twitterImage: '/logo.png',
  twitterCard: 'summary'
})

useHead({
  htmlAttrs: {
    lang: 'id'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png', 
      href: '/icon.jpg'
    }
  ],
  titleTemplate: (titleChunk) => {
        // Gunakan titleChunk untuk mendapatkan judul dinamis
        return titleChunk ? `${titleChunk} - NYAWA` : 'NYAWA';
      }
    

})
</script>
<template>

  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>

</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;400&display=swap');
  template {
    font-family: 'Poppins', sans-serif;
  }
</style>
