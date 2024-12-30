<template>
    <section class="container mx-auto my-5 md:max-w-3xl ">
        <h2 class="text-2xl font-semibold text-center">Kategori</h2>
        <div v-for="category in kategoriData" :key="category.id_kategori"
            class="my-8 mx-4 md:mx-0 rounded-lg shadow-xl">
            <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row">
                <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                    :src="mediaBaseUrl + category.gambar" :alt="category.nama_kategori">
                <div class="flex flex-col justify-between p-4">
                    <p class="font-semibold capitalize text-lg lg:text-xl">{{ category.nama_kategori }}</p>
                    <div class="mb-4" v-html="category.deskripsi"></div>
                    <NuxtLink :to="{ name: 'belanja' }"
                        class="grid text-center mt-5 rounded-lg text-white  px-3 py-2 bg-slate-900 hover:bg-slate-700">
                        Lihat Produk
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { NuxtImg } from '#components';

export default {
    components: {
        NuxtImg,
    },
    setup() {
        const {api_development_url, Api_key} = useRuntimeConfig().public;
        const kategoriUrl = `${api_development_url}/fend/kategori`;

        const kategoriData = ref([]);
        const mediaBaseUrl = ref('');

        const fetchKategori = async () => {
            try {
                const response = await $fetch(kategoriUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': Api_key,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status == true) {
                    mediaBaseUrl.value = response.MEDIA;
                    kategoriData.value = response.data;
                } else {
                    console.log(response)
                }
            } catch (err) {
                console.error('Kesalahan saat mengambil data:', err);
            }
        };

        onMounted(fetchKategori);

        return {
            kategoriData,
            mediaBaseUrl,
        };
    },
};
</script>

<style scoped></style>