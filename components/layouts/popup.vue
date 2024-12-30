<template>
  <div>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-10">
      <div class="bg-white p-6 w-full md:w-auto h-5/6 md:h-5/6 rounded overflow-auto relative">
      <button @click="closePopup" class="absolute top-0 right-0 bg-none text-black px-4 py-2 rounded ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
      </button>
          <div class="flex flex-col md:flex-row">
            <!-- Bagian Kiri: Gambar Produk -->
            <div class="flex-shrink-0 mr-4 mb-4 md:mb-0">          
            <!-- Gambar Utama Produk -->
              <img :src="media+selectedProduct.images[selectedProduct.selectedImageIndex]" :alt="selectedProduct.name" class="w-full md:w-96 h-auto object-cover rounded" />
              <div class="flex items-center place-content-center mt-4">
                  <template v-for="(image, imageIndex) in selectedProduct.images" :key="imageIndex">
                      <img
                          :src="media+image"
                          :alt="selectedProduct.nama_produk"
                          @click="selectImage(imageIndex)"
                          @mouseover="handleHoveredImage(imageIndex)"
                          @mouseout="handleHoveredImage(null)"
                          class="w-12 h-12 object-cover rounded cursor-pointer mr-2 border hover:border-gray-500"
                      />
                  </template>
              </div>
          </div>
          <!-- Bagian Kanan: Informasi Produk -->
          <div class="p-4 md:p-9 flex-grow capitalize">
            
              <!-- <img src="/logo1.png" alt="NYAWA-logo" class="h-9 w-auto mb-3" /> -->
              <p class="text-black mb-2 text-sm tracking-wider font-semibold">NYAWA</p>
              <h2 class="text-xl font-medium mb-2">{{ selectedProduct.nama_produk }}</h2>
              <p class="text-gray-600 mb-2 text-lg tracking-wider">{{ selectedProduct.harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }}</p>
              <div class="flex items-center py-2">
                <p class="text-gray-600">Warna :</p>
                <div class="w-7 h-7 rounded ms-3 border border-black bg-gray-200" v-bind:style="{ backgroundColor: selectedProduct.warna }"></div>
              </div>
              
              <p class="mb-2">Ukuran :</p>
              <!--  -->
              <div class="flex items-center space-x-1">
                  <template v-for="(size, index) in selectedProduct.ukuran" :key="index">
                      <input
                          type="radio"
                          :id="`size-${index}`"
                          :value="size"
                          v-model="selectedProduct.selectedSize"
                          class="hidden"
                      />
                      <label
                          :for="`size-${index}`"
                          :class="{ 'text-red-500 text-center': selectedProduct.stok[size] === 0 }"
                          :style="{ 'border': selectedProduct.selectedSize === size ? '2px solid #000000' : '2px solid #e2e8f0' }"
                          class="uppercase cursor-pointer inline-block px-4 py-2 border rounded transition duration-300
                              hover:bg-slate-100 focus:outline-none text-center"
                      >
                          {{ size }}
                      </label>
                      
                  </template>
              </div>
              <!-- stok -->
              <div class="mb-2">
              <span v-if="selectedProduct.stok[selectedProduct.selectedSize] > 0" class="text-xs">
                  Stok: {{ selectedProduct.stok[selectedProduct.selectedSize] }} tersedia
              </span>
              <span v-else class="text-xs text-red-500">tidak ada ukuran yang dipilih / stok habis</span>
              </div>
              <!-- kuantintas -->
              <div class="mb-2">
                <button @click="decreaseQuantity" :disabled="quantity <= 1" class="px-3 py-1 bg-gray-200 border rounded-md">-</button>
                <input type="number" v-model="quantity" min="1" :max="selectedProduct.stok[selectedProduct.selectedSize]" class="w-16 text-center" />
                <button @click="increaseQuantity" :disabled="quantity >= selectedProduct.stok[selectedProduct.selectedSize]" class="px-3 py-1 bg-gray-200 border rounded-md">+</button>
                <!-- <p>{{ selectedProduct.stok[selectedProduct.selectedSize] }}</p> -->
              </div>
              <!--  -->
          <!-- Tombol aksi -->
              <div v-if="selectedProduct.selectedSize">
                    <button
                    v-if="selectedProduct.stok[selectedProduct.selectedSize] > 0"
                    @click="addToCart"
                    class="m-4 bg-transparent text-black px-4 py-2 rounded block w-full border border-gray-400 transition duration-300 hover:bg-black hover:text-white"
                    >
                    Tambah ke Keranjang
                    </button>
                    <button
                    v-if="selectedProduct.stok[selectedProduct.selectedSize] > 0"
                    @click="buyNow"
                    class="m-4 bg-black text-white px-4 py-2 rounded block w-full border transition duration-300 hover:bg-white hover:text-black hover:border-black"
                    >
                    Beli Sekarang
                    </button>
                    <button
                    v-else
                    class="m-4 bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed block w-full"
                    disabled
                    >
                    Stok Habis
                    </button>
                    <nuxt-link
                      class="hover:text-red-500 text-black px-4 block underline underline-offset-4"
                      :to="`/produk/${selectedProduct.slug}`" >
                      Detail Produk
                    </nuxt-link>
              </div>
            </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
data() {
  return {
    hoveredImageIndex: null,
    quantity: 1,
  };
},
mounted() {
    // Set selectedImageIndex ke 0 jika belum ada yang dipilih
    if (this.selectedProduct.selectedImageIndex === null || this.selectedProduct.selectedImageIndex === undefined) {
      this.selectedProduct.selectedImageIndex = 0;
    }
},
// computed: {
//     getStock() {
//       return this.selectedProduct.stok?.find((item) => item.size === this.selectedSize)?.quantity || 0;
//     },
// },
props: {
    selectedProduct: {
      type: Object,
      required: true,
    },
    media: {
      type: String,
      required: true,
    },
    closePopup: {
      type: Function,
      required: true,
    },
},
methods: {
    addToCart() {
    if (this.selectedProduct.selectedSize) {
        // Implementasi penambahan ke keranjang sesuai dengan ukuran yang dipilih
        // Gunakan this.selectedProduct.selectedSize dan this.selectedProduct untuk mendapatkan informasi yang diperlukan
        console.log(`Menambahkan ${this.selectedProduct.nama_produk} (${this.selectedProduct.selectedSize}) ke keranjang.`);
    } else {
        console.log('Pilih ukuran terlebih dahulu.');
    }
    },

    buyNow() {
    if (this.selectedProduct.selectedSize) {
        // Implementasi penambahan ke keranjang sesuai dengan ukuran yang dipilih
        // Gunakan this.selectedProduct.selectedSize dan this.selectedProduct untuk mendapatkan informasi yang diperlukan
        console.log(`membeli ${this.selectedProduct.nama_produk} ukuran ${this.selectedProduct.selectedSize}.`);
    } else {
        console.log('Pilih ukuran terlebih dahulu.');
    }
    },

    selectImage(index) {
        this.selectedProduct.selectedImageIndex = index;
        this.hoveredImageIndex = null;
    },
    handleHoveredImage(index) {
        this.hoveredImageIndex = index;
    },
    increaseQuantity() {
      if (this.quantity < this.maxQuantity) {
        this.quantity++;
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }

  },
  watch: {
    'selectedProduct.selectedSize': function(newVal) {
      if (newVal && this.selectedProduct.stok[newVal]) {
        this.maxQuantity = this.selectedProduct.stok[newVal];
        if (this.quantity > this.maxQuantity) {
          this.quantity = this.maxQuantity;
        }
      }
    }
  }
};

</script>

<style scoped>
/* Tambahkan gaya sesuai kebutuhan */
</style>
