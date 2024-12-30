<template>
  <div v-if="cart.length === 0">
    <div class="flex items-center">
      <div class="text-center items-center my-5">
        <img src="/public/shopping.png" alt="">
        <h1 class="font-semibold text-slate-900">Keranjang belanjamu kosong</h1>
      </div>
    </div>
  </div>
  <div v-else>
    <!-- barang -->
    <div class="my-8">
      <div class="flow-root">
        <ul role="list" class="-my-6 divide-y divide-gray-200">
          <li v-for="(product, index) in cart" :key="index" class="flex py-6">
            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img :src="product.image" :alt="product.name" class="h-full w-full object-cover object-center">
            </div>

            <div class="ml-4 flex flex-1 flex-col">
              <div>
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a :href="product.link" class="text-sm">{{ product.name }}</a>
                  </h3>
                  <p class="ml-4 text-sm">
                    {{ 'Rp.' + product.price.toLocaleString('id-ID', {
                      minimumFractionDigits: 0, maximumFractionDigits: 0
                    }) }}
                  </p>
                </div>
                <p class="mt-1 text-sm text-gray-500 uppercase">{{ product.size }}</p>
              </div>
              <div class="flex flex-1 items-end justify-between text-sm">
                <p class="text-gray-500">Qty {{ product.quantity }}</p>

                <div class="flex">
                  <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500"
                    @click="removeProduct(index)">Remove</button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- total -->
    <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
      <div class="flex justify-between text-base font-medium text-gray-900">
        <p>Total</p>
        <p>{{ calculateSubtotal() }}</p>
      </div>
      <p class="mt-0.5 text-sm text-gray-500">pengiriman dan pajak saat Checkout</p>
      <div class="mt-6 grid">
        <button @click="checkout"
          class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</button>
      </div>
      <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          atau
          <nuxt-link :to="{ name: 'belanja' }" class="font-medium text-indigo-600 hover:text-indigo-500">
            Lanjutkan Belanja
            <span aria-hidden="true"> &rarr;</span>
          </nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useCart } from '~/composables/useCart';
import { useCheckout } from '~/composables/useCheckout';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const { cart, removeProduct } = useCart();
    const { checkoutNow } = useCheckout();
    const router = useRouter();

    const checkout = async () => {
      try {
        // Ensure the cart is not empty
        if (!cart.value.length) {
          console.error('Cart is empty, cannot proceed to checkout.');
          return;
        }

        checkoutNow(cart.value);
        await router.push('/checkout');
      } catch (error) {
        console.error('Error while processing checkout:', error);
      }
    };

    const calculateSubtotal = () => {
      const subtotal = cart.value.reduce((total, product) => {
        // No need to parse price, since it's already a number
        return total + product.price * product.quantity;
      }, 0);

      return `Rp.${subtotal.toLocaleString("id-ID")}`;
    };

    return {
      cart,
      removeProduct,
      calculateSubtotal,
      checkout,
    };
  },
};
</script>

<style scoped></style>
