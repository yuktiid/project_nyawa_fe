<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 ">
        <!-- Bagian Kiri: Form -->
        <div class="col-span-2 lg:pl-10">
            <div v-if="!showShipping">
                <Formalamat @show-shipping="showShippingView" />
            </div>
            <div v-if="showShipping">
                <Shipping @back-to-formalamat="showFormalamatView" @update-shipping-cost="updateShippingCost"
                    :totalWeight="totalWeight" :totalCost="totalCost" />
            </div>
        </div>
        <!-- Bagian Kanan: Gambar Produk dan Informasi -->
        <div class="bg-neutral-100 p-8 border h-100 order-first lg:order-1">
            <div class="md:px-8 lg:px-0">
                <!-- data produk dari localStorage -->
                <div v-for="(item, index) in checkoutProduct" :key="index"
                    class="flex flex-row items-center justify-between mb-3">
                    <div class="flex items-center">
                        <div class="relative">
                            <div class="w-[75px] h-[75px] border-2 rounded-md">
                                <img :src="item.image" alt="Product Image" class="object-contain aspect-square" />
                            </div>
                            <div
                                class="absolute inline-flex items-center justify-center w-4 h-4 lg:w-5 lg:h-5 text-xs font-bold text-white bg-slate-900 rounded-full -top-2 -end-2">
                                {{ item.quantity }}
                            </div>
                        </div>
                        <div class="px-5 mt-3">
                            <h2 class="text-sm lg:text-base">{{ item.name }}</h2>
                            <div class="text-gray-500 text-xs flex items-center">
                                <p class="px-1">{{ item.size.toUpperCase() }}</p>
                            </div>
                            <p class="text-gray-500 text-xs">Rp.{{ item.price.toLocaleString('id-ID') }}</p>
                        </div>
                    </div>
                    <div class="grid justify-items-end">
                        <p class="text-sm text-gray-800">Rp. {{ (item.price * item.quantity).toLocaleString('id-ID') }}
                        </p>
                    </div>
                </div>

                <!-- more information -->
                <div>
                    <div class="flex text-sm justify-between mb-1">
                        <p>Subtotal </p>
                        <span class="total-harga-produk">Rp. {{ subtotalFormatted }}</span>
                    </div>
                    <div class="flex text-sm justify-between mb-1">
                        <p>Shipping </p>
                        <span class="total-harga-pengiriman">{{ shippingCostFormatted }}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <p class="text-lg font-semibold">Total Harga</p>
                        <span class="total-harga text-lg font-semibold">{{ totalCostFormatted }}</span>
                    </div>
                    
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import Formalamat from '~/components/layouts/formalamat.vue';
import Shipping from '~/components/layouts/shipping2.vue';
import { useCheckout } from '~/composables/useCheckout';

export default {
    components: {
        Formalamat,
        Shipping
    },
    setup(props, context) {
        const { retrieveCheckoutData } = useCheckout(); // Import method to retrieve data

        const showShipping = ref(false);
        const shippingCost = ref(0);
        const checkoutProduct = ref([]); // Store the checkout products

        const subtotal = computed(() => {
            return checkoutProduct.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        });

        const totalWeight = computed(() => {
            return checkoutProduct.value.reduce((acc, item) => acc + (item.weight * item.quantity), 0);
        });

        const totalCost = computed(() => {
            return subtotal.value + shippingCost.value;
        });

        const subtotalFormatted = computed(() => {
            return subtotal.value.toLocaleString('id-ID');
        });

        const shippingCostFormatted = computed(() => {
            return 'Rp. ' + shippingCost.value.toLocaleString('id-ID');
        });

        const totalCostFormatted = computed(() => {
            return 'Rp. ' + totalCost.value.toLocaleString('id-ID');
        });

        const showShippingView = () => {
            showShipping.value = true;
            context.emit('update-total-weight', totalWeight.value);
        };

        const showFormalamatView = () => {
            showShipping.value = false;
        };

        const updateShippingCost = (cost) => {
            shippingCost.value = cost;
        };

        onMounted(() => {
            // Retrieve the checkout data from localStorage when the component mounts
            const data = retrieveCheckoutData();
            if (data) {
                checkoutProduct.value = data; // Populate the checkout products
            }
        });

        return {
            showShipping,
            showShippingView,
            showFormalamatView,
            shippingCostFormatted,
            subtotalFormatted,
            totalCostFormatted,
            updateShippingCost,
            checkoutProduct,
            totalWeight,
            totalCost
        };
    }
};
</script>

