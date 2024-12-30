<template>
  <nav class="p-2 md:p-4 border-b sticky top-0 z-10 bg-white">
    <div class="container mx-auto flex items-center justify-between text-transform: capitalize ">
      <div class="flex-initial w-32">
        <ul class="flex space-x-4">
          <li class="hidden md:block">
            <nuxt-link class="hover:text-slate-600 text-black" :to="{ name: 'belanja' }">belanja</nuxt-link>
          </li>
          <li class="hidden md:block">
            <nuxt-link class="hover:text-slate-600 text-black" :to="{ name: 'promo' }">promo</nuxt-link>
          </li>
          <li class="hidden md:block">
            <nuxt-link class="hover:text-slate-600 text-black" :to="{ name: 'inspirasi' }">inspirasi</nuxt-link>
          </li>
          <li class="hidden md:block">
            <nuxt-link class="hover:text-slate-600 text-black" :to="{ name: 'blog' }">blog</nuxt-link>
          </li>
          <!-- Tambahkan class 'hidden' jika layar cukup kecil -->
          <li class=" md:hidden">
            <button @click="toggleMenu">
              <!-- Icon hamburger -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </li>

        </ul>
      </div>
      <!--  -->
      <div class="flex-initial w-64">
        <nuxt-link to="/" class="">
          <NuxtImg src="/logo1.png" alt="Logo" class="mx-auto h-14 md:h-20 w-auto" />
        </nuxt-link>
      </div>
      <!--  -->
      <div class="flex-initial w-32">
        <ul class="flex space-x-4">
          <!-- Tambahkan class 'hidden' jika layar kecil -->
          <li class="">
            <nuxt-link :to="authLink" class="hover:text-slate-600 text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z">
                </path>
              </svg>
            </nuxt-link>
          </li>
          <li class="">
            <button @click="toggleCart" type="button" class="relative -m-2 p-2 text-black hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z">
                </path>
              </svg>

              <!-- Badge untuk jumlah item di keranjang -->
              <span v-if="cartItemCount > 0"
                class="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 rounded-full bg-slate-900 text-white text-xs font-bold">
                {{ cartItemCount }}
              </span>
            </button>
          </li>
        </ul>
      </div>
      <!--  -->
    </div>
  </nav>


  <!-- Offcanvas Menu -->
  <transition name="fade">
    <div v-if="isMenuOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 z-50" @click="closeMenu"></div>
  </transition>
  <transition name="slide">
    <div v-if="isMenuOpen"
      class="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-md overflow-y-auto z-50 pt-7 capitalize">
      <!-- ... Isi menu offcanvas ... -->
      <button @click="closeMenu" class="px-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <ul class="py-4">

        <li class="ps-10">
          <nuxt-link class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            :to="{ name: 'belanja' }">Belanja</nuxt-link>
        </li>
        <li class="ps-10">
          <nuxt-link class="block px-4 py-2 text-gray-800 hover:bg-gray-200" :to="{ name: 'promo' }">Promo</nuxt-link>
        </li>
        <li class="ps-10">
          <nuxt-link class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            :to="{ name: 'inspirasi' }">Inspirasi</nuxt-link>
        </li>
        <li class="ps-10">
          <nuxt-link class="block px-4 py-2 text-gray-800 hover:bg-gray-200" :to="{ name: 'blog' }">blog</nuxt-link>
        </li>

      </ul>
    </div>
  </transition>
  <!--  -->

  <transition name="sidebar-slide">
    <div v-if="cartmenu" class="fixed carts overflow-y-auto inset-y-0 right-0 w-80 bg-white z-50 p-4">
      <div class="grid grid-cols-2 content-center">
        <button @click="closecart" class="">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 class="text md font-semibold">Shopping Cart</h2>
      </div>
      <LayoutsCart />
    </div>
  </transition>

</template>

<script>
import { useCart } from '~/composables/useCart';
import { useTokens } from '~/composables/useToken2';
export default {
  data() {
    return {
      isMenuOpen: false,
      cartmenu: false,
      activeDropdown: null,
      authLink: { name: 'login' },
    };
  },
  setup() {
    const { cartItemCount } = useCart();
    const { retrieveToken } = useTokens();
    const authLink = ref({ name: 'login' });

    onMounted(() => {
      const authData = retrieveToken();
      authLink.value = authData ? { name: 'users' } : { name: 'login' };
    });
    return {
      cartItemCount,
      authLink
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    toggleCart() {
      this.cartmenu = !this.cartmenu;
    },
    closecart() {
      this.cartmenu = false;
    },
    toggleDropdown(name) {
      if (this.activeDropdown === name) {
        this.activeDropdown = null;
      } else {
        this.activeDropdown = name;
      }
    },

  },
};
</script>

<style scoped>
/* Transisi fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}

/* Transisi slide */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave {
  transform: translateX(0);
}

/*  */
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: transform 0.5s;
}

.sidebar-slide-enter,
.sidebar-slide-leave-to {
  transform: translateX(100%);
}

.sidebar-slide-enter-to,
.sidebar-slide-leave {
  transform: translateX(0);
}

.carts {
  box-shadow: -10px 0 15px -3px rgba(0, 0, 0, 0.1), -4px 0 6px -2px rgba(0, 0, 0, 0.05);
}

/*  */
</style>
