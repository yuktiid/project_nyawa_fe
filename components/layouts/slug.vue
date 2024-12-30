<template>

  <div v-if="data">
    <div class="container mx-auto p-4">
      <div class="grid md:flex items-start justify-between ">
        <div class="grid grid-flow-col md:grid-flow-row md:grid-cols-1 gap-4 mt-5 order-2 md:order-1">

          <img v-for="(image, index) in data.images" :key="index" :src="media + image"
            :alt="`${data.nama_produk} - Image ${index + 1}`" @click="handleImageClick(image)"
            class="w-24 h-auto cursor-pointer rounded" />

        </div>
        <div class="flex-shrink-0 w-full md:w-2/6 md:mx-9 order-1 md:order-2">
          <img :src="media + selectedImage" class="w-full h-auto rounded">
        </div>

        <div class="flex-grow md:w-1/3 mt-5 order-3 md:order-3">
          <p class="text-md font-bold mb-4">NYAWA</p>
          <p class="text-2xl font-medium mb-4">{{ data.nama_produk }}</p>
         
          <p class="text-gray-600 text-l mb-4">
          <div v-if="data.diskon > 0">
            <span class="line-through ">
              {{ 'Rp.' + data.harga.toLocaleString('id-ID', {
                minimumFractionDigits: 0, maximumFractionDigits: 0
              }) }}
            </span>
            <span class="text-red-500 text-xl ml-1">
              {{ 'Rp.' + discountedPrice(data).toLocaleString('id-ID', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }) }}
            </span>
          </div>
          <div v-else>
            {{ 'Rp.' + data.harga.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
            }}
          </div>
          </p>


          <hr>
          <div class="my-6">
            <button @click="toggleDescription(data)" class="cursor-pointer capitalize">
              {{ data.showDescription ? 'Sembunyikan Deskripsi' : 'Deskripsi Produk' }}
              <template v-if="data.showDescription">
                <Icon name="bi:chevron-up" />
              </template>
              <template v-else>
                <Icon name="bi:chevron-down" />
              </template>
            </button>

            <transition name="fade" mode="out-in">
              <div v-if="data.showDescription" class="mt-2">
                <div v-html="data.deskripsi"></div>
              </div>
            </transition>
          </div>
          <hr>
          <div class="flex items-center py-2">
            <p class="text-gray-600 my-2">Warna:</p>
            <div class="w-7 h-7 rounded ms-3 border border-black bg-gray-200" :style="{ backgroundColor: data.warna }">
            </div>
          </div>

          <p class="text-gray-600 mb-2">Size:</p>

          <div class="flex items-center space-x-1">
            <template v-for="(ukuran, index) in data.ukuran" :key="index">
              <input type="radio" :id="`size-${index}`" :value="ukuran" v-model="data.selectedSize" class="hidden" />
              <label :for="`size-${index}`" :class="{ 'text-red-500 text-center': data.stok[ukuran] === 0 }"
                :style="{ border: data.selectedSize === ukuran ? '2px solid #000000' : '2px solid #e2e8f0' }"
                class="uppercase cursor-pointer inline-block px-4 py-2 border rounded transition duration-300 hover:bg-slate-900 hover:text-white focus:outline-none text-center">
                {{ ukuran }}
              </label>
            </template>
          </div>

          <div class="mb-2">
            <span v-if="data.stok[data.selectedSize] > 0" class="text-xs">
              Stok: <span id="squan">{{ data.stok[data.selectedSize] }}</span> tersedia
            </span>
            <span v-else class="text-xs">Pilih ukuran terlebih dahulu</span>
          </div>

          <div class="mb-2">
            <button @click="minusQuantity" class="mx-1 px-3 py-1 bg-gray-200 border rounded-md">-</button>
            <span id="quantity" class="mx-1 px-3 py-1 bg-gray-200 border rounded-md">{{ quantity }}</span>
            <button @click="plusQuantity" class="mx-1 px-3 py-1 bg-gray-200 border rounded-md">+</button>
          </div>

          <div v-if="data.selectedSize">
            <div class="md:flex justify-items-center">
              <button v-if="data.stok[data.selectedSize] > 0" @click="addToCart"
                class="my-2 md:m-4 bg-transparent text-black px-4 py-2 rounded-full block w-full md:basis-1/2 border-2 border-slate-900 transition duration-300 hover:bg-slate-900 hover:text-white">
                Tambah ke Keranjang
              </button>
              <button v-if="data.stok[data.selectedSize] > 0" @click="buyNow"
                class="my-2 md:m-4 bg-slate-900 text-white px-4 py-2 rounded-full block w-full md:basis-1/2 border-2 border-slate-900 transition duration-300 hover:bg-white hover:text-black">
                Beli Sekarang
              </button>

              <button v-else
                class="my-2 md:m-4 bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed block w-full" disabled>
                Stok Habis
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="showSuccess" class="fixed top-16 right-5 bg-slate-900 text-white px-4 py-2 rounded shadow-md">
        Produk berhasil ditambahkan ke keranjang!
      </div>
    </transition>
    <transition name="fade">

      <div v-if="showError" class="fixed top-16 right-5 bg-slate-900 text-white px-4 py-2 rounded shadow-md">
        Produk gagal ditambahkan ke keranjang!
      </div>
    </transition>
  </div>
  <div v-else>
    <div class="container mx-auto p-4">
      <h1 class="text-4xl font-bold text-center">404 Produk tidak ditemukan</h1>
    </div>
  </div> 
</template>

<script>
import { useCart } from '~/composables/useCart';
import Swal from 'sweetalert2';
export default {
  name: 'slug',
  data() {
    return {
      selectedImage: "", // This should be a string, not an array
      selectedSize: "xs",
      quantity: 1,
      maxQuantity: 10, // Maximum quantity allowed
      minQuantity: 1, // Minimum quantity allowed
      data: null,
      media: null,
      showSuccess: false,
      showError: false,
    };
  },
  async created() {
    const slug = this.$route.params.slug;
    const apiUrl = "fend/produk/";
    const api_development_url = useRuntimeConfig().public.api_development_url;
    try {
      const response = await $fetch(`${apiUrl}${slug}`, {
        method: "GET",
        baseURL: api_development_url,
        headers: {
        'Authorization': useRuntimeConfig().public.Api_key,
        'Content-Type': 'application/json',
      },
      });

      this.data = response.data;
      this.media = response.MEDIA;

      if (this.data && this.data.images && this.data.images.length > 0) {
        this.selectedImage = this.data.images[0]; // Assign the first image as selected
      }
      this.setPageTitle(this.data.nama_produk);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  },
  methods: {
    setPageTitle(title) {
      this.$nextTick(() => {
        document.title = `${title} - NYAWA`;
      });
    },
    buyNow() {
      if (this.data.selectedSize) {
        try {
          const finalPrice = this.data.diskon > 0 ? this.discountedPrice(this.data) : this.data.harga;
          const orderData = [{
            id_produk: this.data.id_produk,
            link: `/produk/${this.data.slug}`,
            name: this.data.nama_produk,
            size: this.data.selectedSize,
            quantity: this.quantity,
            price: finalPrice,
            image: this.media + this.selectedImage,
            weight: this.data.berat
          }];
          const { checkoutNow } = useCheckout();
          checkoutNow(orderData);
          this.$router.push('/checkout');
        } catch (error) {
          console.error('Error saat membeli produk:', error);
        }
      } else {
        console.log('Pilih ukuran terlebih dahulu.');
      }
    },


    addToCart() {
      const { addToCart } = useCart();

      if (this.data.selectedSize) {
        const finalPrice = this.data.diskon > 0 ? this.discountedPrice(this.data) : this.data.harga;
        addToCart({
          id_produk: this.data.id_produk,
          link: `/produk/${this.data.slug}`,
          name: this.data.nama_produk,
          size: this.data.selectedSize,
          quantity: this.quantity,
          price: finalPrice,
          image: this.media + this.selectedImage,
          weight: this.data.berat
        });
        Swal.fire({
          title: 'Berhasil!',
          text: 'Produk berhasil ditambahkan ke keranjang!',
          icon: 'success',
          timer: 2000, // Auto close dalam 2 detik
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Pilih ukuran terlebih dahulu.',
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    },
    handleImageClick(image) {
      this.selectedImage = image;
    },
    plusQuantity() {
      if (this.quantity < this.maxQuantity) {
        this.quantity++;
      }
    },
    minusQuantity() {
      if (this.quantity > this.minQuantity) {
        this.quantity--;
      }
    },
    toggleDescription(item) {
      item.showDescription = !item.showDescription;
    },
    discountedPrice(product) {
      const discountAmount = product.harga * (product.diskon / 100);
      return product.harga - discountAmount;
    }
  },
};
</script>
<style>
/* Animasi fade in-out */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active di versi Vue lebih lama */
  {
  opacity: 0;
}
</style>