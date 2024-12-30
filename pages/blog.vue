<template>
  <div>
    <div v-for="post in posts" :key="post.id" class="md:flex items-center mb-8 mx-5 md:mx-16 my-8">
      
      <img
        v-if="post.image"
        :src="post.image"
        alt="Post Image"
        class="w-full h-64 md:h-96 object-cover mr-20 rounded"
      />

      <div class="w-full mt-5 md:mt-0">
        
        <p class="text-gray-600 italic text-sm mb-3">{{ post.date }}</p>
        <h2 class="text-lg md:text-xl font-medium">{{ post.title }}</h2>
        <p class="text-gray-600 my-2">{{ post.excerpt }}</p>

        
        <nuxt-link :to="`/blog/${post.id}`" class="text-blue-500 underline underline-offset-4">Baca Selengkapnya</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          id: 1,
          date: 'prestigeonline.com - 03 June 2023',
          title: 'Kolaborasi Lanjutan Rama Dauhan untuk NYAWA. Hadirkan Koleksi Resort untuk Pertama Kalinya',
          excerpt: 'The second collaboration between Rama Dauhan and NYAWA. titled "Monsoon" will transport you to a realm of beauty and transformation.',
          image: 'https://via.placeholder.com/300', 
        },
        {
          id: 2,
          date: 'inisurabaya.com - 30 Maret 2023',
          title: 'Dominan Warna Putih, 30 Koleksi Busana NYAWA. Menyapa Penikmat Fashion Surabaya',
          excerpt: 'NYAWA., label busana asal Bandung untuk pertama kalinya menyapa penikmat fashion kota Surabaya, gelaran acara dalam kemasan peragaan busana, bazaar, dan instalasi seni bertajuk "INTRO" itu berlangsung di Milieu Space selama tiga hari (Jumat-Minggu 31-April 2023).',
          image: 'https://via.placeholder.com/300',
        },
        // Add more posts as needed
      ],
    };
  },
};
</script>
