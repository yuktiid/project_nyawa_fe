<template>
  <div class="container p-4 mx-auto">
    <h1 class="text-2xl font-semibold my-3">Pesanan Saya</h1>

    <div class="lg:flex gap-4 ">
      <ul class="space-x-3 overflow-auto lg:space-y-4 lg:space-x-0 text-sm font-medium md:me-4 mb-4 md:mb-0 flex lg:inline">
        <li>
          <button @click.prevent="setActiveTab('bbayar')"
            :class="activeTab === 'bbayar' ? 'bg-slate-900 text-white' : 'bg-gray-50 hover:bg-gray-200 text-gray-900'"
            class="inline-flex items-center text-center px-4 py-3 rounded-lg w-full whitespace-nowrap">
            Belum Bayar ({{ bbayar.length }})
          </button>
        </li>
        <li>
          <button @click.prevent="setActiveTab('dikemas')"
            :class="activeTab === 'dikemas' ? 'bg-slate-900 text-white' : 'bg-gray-50 hover:bg-gray-200 text-gray-900'"
            class="inline-flex items-center text-center px-4 py-3 rounded-lg w-full whitespace-nowrap">
            Dikemas ({{ dikemas.length }})
          </button>
        </li>
        <li>
          <button @click.prevent="setActiveTab('dikirim')"
            :class="activeTab === 'dikirim' ? 'bg-slate-900 text-white' : 'bg-gray-50 hover:bg-gray-200 text-gray-900'"
            class="inline-flex items-center text-center px-4 py-3 rounded-lg w-full whitespace-nowrap">
            Dikirim ({{ dikirim.length }})
          </button>
        </li>
        <li>
          <button @click.prevent="setActiveTab('selesai')"
            :class="activeTab === 'selesai' ? 'bg-slate-900 text-white' : 'bg-gray-50 hover:bg-gray-200 text-gray-900'"
            class="inline-flex items-center text-center px-4 py-3 rounded-lg w-full whitespace-nowrap">
            Selesai ({{ selesai.length }})
          </button>
        </li>
        <li>
          <button @click="logout()"
            class="inline-flex items-center text-center px-4 py-3 rounded-lg w-full whitespace-nowrap bg-gray-50 hover:bg-gray-200 text-gray-900">
            Keluar
          </button>
        </li>
      </ul>
      <!-- data pesanan -->
      <div class="py-6 lg:p-6 flex-1 text-medium rounded-lg w-full">
        <!-- Tampilan ketika tab 'Belum Bayar' aktif -->
        <div v-if="activeTab === 'bbayar'" class="mb-2 rounded">
          <div v-if="bbayar && bbayar.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-2 justify-center">
            <div v-for="(order, index) in bbayar" :key="index"
              class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg ">
              <div v-for="(item, itemIndex) in order.items" :key="itemIndex" class="flex items-center border-b py-2">
                <div class="grid grid-cols-3 items-center justify-between">
                  <div class="">
                    <div class="w-[75px] h-[75px] border-2 rounded-md">
                      <div v-if="item.produk.gambar && item.produk.gambar.length > 0">
                        <img :src="media + JSON.parse(item.produk.gambar)[0]" alt="Product Image"
                          class="object-contain aspect-square" />
                      </div>
                    </div>
                  </div>
                  <div class="px-3 col-span-2">
                    <h2 class="text-sm lg:text-base">{{ item.nama_produk }}</h2>
                    <div class="flex justify-between items-center">
                      <p class="text-gray-500 text-base uppercase">{{ item.ukuran }}</p>
                      <p class="text-gray-500 text-xs">{{ 'Rp.' + item.harga_satuan.toLocaleString('id-ID', {
                        minimumFractionDigits: 0, maximumFractionDigits: 0
                      }) }} x {{ item.jumlah_barang }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="">
                <div class="flex justify-between mt-2">
                  <p class="text-gray-700 text-sm">{{ order.nama_pengiriman }}</p>
                  <p class="text-gray-700 text-sm">{{ 'Rp.' + parseInt(order.harga_pengiriman).toLocaleString('id-ID', {
                    minimumFractionDigits: 0, maximumFractionDigits: 0
                  }) }}</p>
                </div>
                <p class="font-normal text-gray-700 text-right my-2">Total {{ order.items.length }} produk: <span
                    class="font-semibold">{{ 'Rp.' + parseInt(order.total_harga).toLocaleString('id-ID', {
                      minimumFractionDigits: 0, maximumFractionDigits: 0
                    }) }}</span></p>
                <a :href="order.checkout_link" target="_blank"
                  class="grid bottom-0 text-center hover:bg-slate-900 hover:text-white border-2 bg-white rounded-lg p-3 my-2">Bayar
                  Sekarang</a>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="grid place-items-center my-10">
              <img src="/public/note.png" alt="sale" class="w-[20%]">
              <h1 class="text-xl md:text-3xl font-bold">Belum ada pesanan</h1>
            </div>
          </div>
        </div>

        <!-- Contoh tampilan tab 'Dikemas' -->
        <div v-if="activeTab === 'dikemas'" class="mb-2">
          <div v-if="dikemas && dikemas.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 px-2">
            <div v-for="(order, index) in dikemas" :key="index"
              class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div v-for="(item, itemIndex) in order.items" :key="itemIndex" class="flex items-center border-b py-2">
                <div class="grid grid-cols-3 items-center justify-between">
                  <div class="">
                    <div class="w-[75px] h-[75px] border-2 rounded-md">
                      <div v-if="item.produk.gambar && item.produk.gambar.length > 0">
                        <img :src="media + JSON.parse(item.produk.gambar)[0]" alt="Product Image"
                          class="object-contain aspect-square" />
                      </div>
                    </div>
                  </div>
                  <div class="px-3 col-span-2">
                    <h2 class="text-sm lg:text-base">{{ item.nama_produk }}</h2>
                    <div class="flex justify-between items-center">
                      <p class="text-gray-500 text-base uppercase">{{ item.ukuran }}</p>
                      <p class="text-gray-500 text-xs">{{ 'Rp.' + item.harga_satuan.toLocaleString('id-ID', {
                        minimumFractionDigits: 0, maximumFractionDigits: 0
                      }) }} x {{ item.jumlah_barang }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between mt-2">
                <p class="text-gray-700 text-sm">{{ order.nama_pengiriman }}</p>
                <p class="text-gray-700 text-sm">{{ 'Rp.' + parseInt(order.harga_pengiriman).toLocaleString('id-ID', {
                  minimumFractionDigits: 0, maximumFractionDigits: 0
                }) }}</p>
              </div>
              <p class="font-normal text-gray-700 text-right my-2">Total {{ order.items.length }} produk: <span
                  class="font-semibold">{{ 'Rp.' + parseInt(order.total_harga).toLocaleString('id-ID', {
                    minimumFractionDigits: 0, maximumFractionDigits: 0
                  }) }}</span></p>

            </div>
          </div>
          <div v-else>
            <div class="grid place-items-center my-10">
              <img src="/public/note.png" alt="sale" class="w-[20%]">
              <h1 class="text-xl md:text-3xl font-bold">Belum ada pesanan</h1>
            </div>
          </div>
        </div>

        <!-- Contoh tampilan tab 'Dikirim' -->
        <div v-if="activeTab === 'dikirim'" class="mb-2">
          <div v-if="dikirim && dikirim.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 px-2">
            <div v-for="(order, index) in dikirim" :key="index"
              class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div v-for="(item, itemIndex) in order.items" :key="itemIndex" class="flex items-center border-b py-2">
                <div class="grid grid-cols-3 items-center justify-between">
                  <div class="">
                    <div class="w-[75px] h-[75px] border-2 rounded-md">
                      <div v-if="item.produk.gambar && item.produk.gambar.length > 0">
                        <img :src="media + JSON.parse(item.produk.gambar)[0]" alt="Product Image"
                          class="object-contain aspect-square" />
                      </div>
                    </div>
                  </div>
                  <div class="px-3 col-span-2">
                    <h2 class="text-sm lg:text-base">{{ item.nama_produk }}</h2>
                    <div class="flex justify-between items-center">
                      <p class="text-gray-500 text-base uppercase">{{ item.ukuran }}</p>
                      <p class="text-gray-500 text-xs">{{ 'Rp.' + item.harga_satuan.toLocaleString('id-ID', {
                        minimumFractionDigits: 0, maximumFractionDigits: 0
                      }) }} x {{ item.jumlah_barang }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between mt-2">
                <p class="text-gray-700 text-sm">{{ order.nama_pengiriman }}</p>
                <p class="text-gray-700 text-sm">{{ 'Rp.' + parseInt(order.harga_pengiriman).toLocaleString('id-ID', {
                  minimumFractionDigits: 0, maximumFractionDigits: 0
                }) }}</p>
              </div>
              <div class="flex justify-between mt-2">
                <p class="text-gray-700 text-sm">No. Resi</p>
                <p class="text-gray-700 text-sm">{{order.noResi}}</p>
              </div>
              <p class="font-normal text-gray-700 text-right my-2">Total {{ order.items.length }} produk: <span
                  class="font-semibold">{{ 'Rp.' + parseInt(order.total_harga).toLocaleString('id-ID', {
                    minimumFractionDigits: 0, maximumFractionDigits: 0
                  }) }}</span></p>
              <div class="grid">
                <button @click="pselesai(order.id_payment)"
                  class=" bottom-0 text-center hover:bg-slate-900 hover:text-white border-2 bg-white rounded-lg p-3 my-2">Pesanan
                  Selesai
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="grid place-items-center my-10">
              <img src="/public/note.png" alt="sale" class="w-[20%]">
              <h1 class="text-xl md:text-3xl font-bold">Belum ada pesanan</h1>
            </div>
          </div>
        </div>

        <!-- Contoh tampilan tab 'Selesai' -->
        <div v-if="activeTab === 'selesai'" class="mb-2 ">
          <div v-if="selesai && selesai.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 px-2">
            <div v-for="(order, index) in selesai" :key="index"
              class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div v-for="(item, itemIndex) in order.items" :key="itemIndex" class="flex items-center border-b py-2">
                <div class="grid grid-cols-3 items-center justify-between">
                  <div class="">
                    <div class="w-[75px] h-[75px] border-2 rounded-md">
                      <div v-if="item.produk.gambar && item.produk.gambar.length > 0">
                        <img :src="media + JSON.parse(item.produk.gambar)[0]" alt="Product Image"
                          class="object-contain aspect-square" />
                      </div>
                    </div>
                  </div>
                  <div class="px-3 col-span-2">
                    <h2 class="text-sm lg:text-base">{{ item.nama_produk }}</h2>
                    <div class="flex justify-between items-center">
                      <p class="text-gray-500 text-base uppercase">{{ item.ukuran }}</p>
                      <p class="text-gray-500 text-xs">{{ 'Rp.' + item.harga_satuan.toLocaleString('id-ID', {
                        minimumFractionDigits: 0, maximumFractionDigits: 0
                      }) }} x {{ item.jumlah_barang }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between mt-2">
                <p class="text-gray-700 text-sm">{{ order.nama_pengiriman }}</p>
                <p class="text-gray-700 text-sm">{{ 'Rp.' + parseInt(order.harga_pengiriman).toLocaleString('id-ID', {
                  minimumFractionDigits: 0, maximumFractionDigits: 0
                }) }}</p>
              </div>
              <div class="flex justify-between mt-2">
                <p class="text-gray-700 text-sm">No. Resi</p>
                <p class="text-gray-700 text-sm">{{order.noResi}}</p>
              </div>
              <p class="font-normal text-gray-700 text-right my-2">Total {{ order.items.length }} produk: <span
                  class="font-semibold">{{ 'Rp.' + parseInt(order.total_harga).toLocaleString('id-ID', {
                    minimumFractionDigits: 0, maximumFractionDigits: 0
                  }) }}</span></p>

            </div>

          </div>
          <div v-else>
            <div class="grid place-items-center my-10">
              <img src="/public/note.png" alt="sale" class="w-[20%]">
              <h1 class="text-xl md:text-3xl font-bold">Belum ada pesanan</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useTokens } from '~/composables/useToken2';

export default {
  setup() {
    const activeTab = ref('bbayar');
    const { $swal } = useNuxtApp();
    const bbayar = ref([]);
    const dikemas = ref([]);
    const dikirim = ref([]);
    const selesai = ref([]);
    const media = ref(null);
    const api_development_url = useRuntimeConfig().public.api_development_url;
    const { retrieveToken, clearTokenData } = useTokens();
    const authData = retrieveToken();

    const pselesai = (id_payment) => {
      console.log(id_payment)
      $swal.fire({
        icon: 'info',
        title: 'Konfirmasi pesanan selesai',
        text: 'Silakan klik Ya jika pesanan sudah anda terima!',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { token } = authData;
          const response = await fetch(`${api_development_url}/payments/pesanan-selesai/${id_payment}`, {
            method: "POST",
            headers: {
              'Authorization': `${token}`,
              'Content-Type': 'application/json',
            },
          });
          const result = await response.json();
          if (result.status == true) {
            $swal.fire({
              icon: 'success',
              title: 'Berhasil Konfirmasi pesanan selesai',
              timer: 3000,
              willClose: () => {
                fetchData()
              }
            })
          } else {
            $swal.fire({
              icon: 'error',
              title: 'Gagal Konfirmasi pesanan selesai',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: 'Ok',
            })
          }
        }
      })
    }

    const logout = () => {
      $swal.fire({
        icon: 'info',
        title: 'Keluar',
        text: 'Apakah anda ingin keluar!',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
      }).then(async (result) => {
        if (result.isConfirmed) {
          clearTokenData();
          window.location.href = '/';
        }
      })
      
    };


    const setActiveTab = (tab) => {
      activeTab.value = tab;
    };

    const fetchData = async () => {
      if (authData) {
        const { email, token } = authData;
        try {
          const response = await fetch(`${api_development_url}/produks/payment/all/${email}`, {
            method: "GET",
            headers: {
              'Authorization': `${token}`,
              'Content-Type': 'application/json',
            },
          });
          const result = await response.json();
          if (result.status == true) {
            bbayar.value = result.pending;
            dikemas.value = result.settled;
            dikirim.value = result.delivered;
            selesai.value = result.accepted;
            media.value = result.MEDIA;
          } else {
            clearTokenData()
          }
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      } else {
        console.error("No auth data found");
      }
    };

    onMounted(() => {
      fetchData();

      if (typeof window !== 'undefined') {
        // return navigateTo('/login')
      }
    });

    return {
      activeTab,
      setActiveTab,
      pselesai,
      bbayar,
      dikemas,
      dikirim,
      selesai,
      media,
      logout
    };
  }
};
</script>

<style scoped>
.bg-slate-900 {
  background-color: #1e293b;
}
</style>
