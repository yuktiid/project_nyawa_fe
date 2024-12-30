<template>
  <div class="border-t flex flex-col items-center justify-center pt-12 px-5 md:pt-24">
    <h2 class="text-2xl font-bold uppercase">Newsletter</h2>
    <p class="text-gray-600 text-center max-w-md mx-auto my-5">
      Subscribe to our newsletter and receive IDR50.000 gift card from your email for your first purchase.
    </p>
    <form @submit.prevent="subscribe" class="flex items-center mb-4">
      <input
        type="email"
        v-model="email"
        class="p-2 border border-gray-400 rounded w-full md:w-96"
        placeholder="Email"
      />
      <button type="submit" class="border-2 border-black ms-2 bg-black w-44 text-white p-2 rounded hover:bg-white hover:text-black">
        Subscribe
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    subscribe() {
      
      console.log("Berlangganan dengan email:", this.email);
      // logika pengiriman data ke server di sini
    },
  },
};
</script>
