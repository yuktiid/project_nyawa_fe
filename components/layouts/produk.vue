<template>
  <div>

    <div class="h-25 bg-white p-10">
      <div class="flex">
        <h1 class="text-center w-full text-3xl font-semibold">{{ filterText }}</h1>
      </div>
    </div>
    <div class="flex justify-center mb-4 text-md overflow-x-auto whitespace-nowrap">
      <button @click="setFilter('all')"
        :class="{ 'bg-slate-900 text-white': filter === 'all', 'border-slate-900 border-2 ': filter !== 'all' }"
        class="md:px-4 md:py-2 px-3 rounded-full mx-2 hover:bg-slate-900 hover:text-white">All</button>
      <!-- Tampilkan kategori -->
      <button v-for="category in kategori" :key="category.slug" @click="setFilter(category.slug)"
        :class="{ 'bg-slate-900 text-white': filter === category.slug, 'border-slate-900 border-2': filter !== category.slug }"
        class="px-4 py-2 rounded-full mx-2 hover:bg-slate-900 hover:text-white">
        {{ category.nama_kategori }}
      </button>
    </div>
    <div class="m-5">
      <form class="mx-auto">
        <label for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" v-model="searchQuery"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400"
            placeholder="Search For..." />
        </div>
      </form>
    </div>
    <!-- Grid produk -->
    <div v-if="filteredProducts.length > 0">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 px-5">
        <div v-for="product in filteredProducts" :key="product.id_produk" class="relative group mb-5">
          <nuxt-link :to="`/produk/${product.slug}`" class="">
            <img
              :src="hoveredIndex === product.id_produk ? `${products.MEDIA}${product.img_hover}` : `${products.MEDIA}${product.img_thumb}`"
              :alt="product.name" class=" object-cover cursor-pointer rounded"
              @mouseover="handleImageHover(product.id_produk)" @mouseout="handleImageHover(-1)" />
            <div class="flex justify-center items-center p-2">
              <div class="text-center">
                <h3 class="text-sm md:text-lg font-normal">{{ product.nama_produk }}</h3>
                <p class="text-sm md:text-md text-gray-600">
                <div v-if="product.diskon > 0">
                  <span class="line-through">
                    {{ 'Rp.' + product.harga.toLocaleString('id-ID', {
                      minimumFractionDigits: 0, maximumFractionDigits: 0
                    }) }}
                  </span>
                  <span class="text-red-500">
                    {{ 'Rp.' + discountedPrice(product).toLocaleString('id-ID', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }) }}
                  </span>
                </div>
                <div v-else>
                  {{ 'Rp.' + product.harga.toLocaleString('id-ID', {
                    minimumFractionDigits: 0, maximumFractionDigits: 0
                  })
                  }}
                </div>
                </p>
                <p class="w-7 h-7 m-auto my-1 border border-black" v-bind:style="{ backgroundColor: product.warna }">
                </p>
              </div>
            </div>
          </nuxt-link>
          <!-- <div class="absolute top-0 left-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button @click="showProductDetail(product)" class="bg-gray-800 text-white p-2 rounded">&#x002B;</button>
        </div> -->
        </div>
      </div>
    </div>
    <div v-else>
      <div class="grid place-items-center my-10">
        <img src="/public/sale.png" alt="sale" class="w-[20%]">
        <h1 class="text-3xl font-bold">Data Tidak Ditemukan</h1>
      </div>
    </div>
  </div>
</template>
<script setup>

const api_development_url = useRuntimeConfig().public.api_development_url;
const apiUrl = `${api_development_url}/fend`;
const kategoriUrl = `${api_development_url}/fend/kategori`;

const { data: products, error } = await useAsyncData('products', async () => {
  try {
    const response = await $fetch(apiUrl, {
      method: 'GET', headers: {
        'Authorization': useRuntimeConfig().public.Api_key,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (err) {
    console.error('Kesalahan saat mengambil data:', err);
    throw err;
  }
});

const { data: kategoriData, errk } = await useAsyncData('kategori', async () => {
  try {
    const response = await $fetch(kategoriUrl, {
      method: 'GET',
      headers: {
        'Authorization': useRuntimeConfig().public.Api_key,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (err) {
    console.error('Kesalahan saat mengambil data:', err);
    throw err;
  }
});

const hoveredIndex = ref(-1);
const filter = ref('all');
const searchQuery = ref('');  // Add search query

const handleImageHover = (id) => {
  hoveredIndex.value = id;
};

const setFilter = (filterValue) => {
  filter.value = filterValue;
};

const filteredProducts = computed(() => {
  const filteredByCategory = filter.value === 'all'
    ? products.value.data
    : products.value.data.filter(product => product.slug_kategori === filter.value);

  if (searchQuery.value) {
    return filteredByCategory.filter(product =>
      product.nama_produk.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filteredByCategory;
});

const kategori = computed(() => kategoriData.value.data || []);

const filterText = computed(() => {
  if (filter.value === 'all') {
    return 'All';
  } else {
    const category = kategori.value.find(cat => cat.slug === filter.value);
    return category ? category.nama_kategori : 'All';
  }
});

const discountedPrice = (product) => {
  const discountAmount = product.harga * (product.diskon / 100);
  return product.harga - discountAmount;
};


useHead({
  title: 'Belanja',
});
</script>
