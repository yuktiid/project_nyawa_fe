<template>
    <div>
        <div class="p-8 space-y-4 container mx-auto">
            <div class="border p-4 rounded-md">
                <h1 class="text-2xl font-semibold mb-2">Alamat Pengiriman</h1>
                <dl class="text-gray-900 divide-y divide-gray-200">
                    <div class="flex flex-col pt-3">
                        <dt class="mb-1 text-gray-500 md:text-md">Nama Penerima</dt>
                        <dd class="text-md font-semibold capitalize">{{ formData.name }}</dd>
                    </div>
                    <div class="flex flex-col pt-3">
                        <dt class="mb-1 text-gray-500 md:text-md">Email</dt>
                        <dd class="text-md font-semibold">{{ formData.email }}</dd>
                    </div>
                    <div class="flex flex-col pt-3">
                        <dt class="mb-1 text-gray-500 md:text-md">No. Telepon (WhatsApp)</dt>
                        <dd class="text-md font-semibold">{{ formData.no_telp }}</dd>
                    </div>
                    <div class="flex flex-col py-3">
                        <dt class="mb-1 text-gray-500 md:text-md">Alamat</dt>
                        <dd class="text-md font-semibold">{{ formData.address }}, {{ formData.selectedCity.type }} {{
                            formData.selectedCity.city_name }}, {{ formData.postalCode }}, {{
                                formData.selectedCity.province }}</dd>
                    </div>
                </dl>
            </div>

            <div class="p-4 border rounded-md">
                <h1 class="text-xl font-semibold mb-3">Pilih jenis pengiriman</h1>
                <div class="grid grid-cols-3 gap-3 md:gap-4">
                    <div class="max-w-xs bg-white border border-gray-200 rounded-lg hover:shadow-lg">
                        <input type="radio" class="hidden" name="ship" id="jne" value="jne" v-model="selectedCourier">
                        <label for="jne">
                            <img class="rounded-t-lg hover:cursor-pointer" src="/public/jne.jpg" alt="JNE" />
                        </label>
                    </div>
                    <div class="max-w-xs bg-white border border-gray-200 rounded-lg hover:shadow-lg">
                        <input type="radio" class="hidden" name="ship" id="tiki" value="tiki" v-model="selectedCourier">
                        <label for="tiki">
                            <img class="rounded-t-lg hover:cursor-pointer" src="/public/tiki.jpg" alt="TIKI" />
                        </label>
                    </div>
                    <div class="max-w-xs bg-white border border-gray-200 rounded-lg hover:shadow-lg">
                        <input type="radio" class="hidden" name="ship" id="pos" value="pos" v-model="selectedCourier">
                        <label for="pos">
                            <img class="rounded-t-lg hover:cursor-pointer" src="/public/pos.jpg" alt="POS" />
                        </label>
                    </div>
                </div>
            </div>

            <div class="border rounded-md p-4">
                <h1 class="text-xl font-semibold mb-4">Pilih metode pengiriman</h1>
                <div v-if="loading" class="text-center">Loading...</div>
                <ul v-else-if="shippingResults && shippingResults.length">
                    <li v-for="(result, index) in shippingResults" :key="index" class="flex gap-3 border-b p-4">
                        <input type="radio" name="metode" :id="'metode' + index" :value="result.cost[0].value"
                            v-model="selectedShippingCost" @change="emitShippingCost(result.cost[0].value)">
                        <label :for="'metode' + index" class="flex justify-between w-full hover:cursor-pointer">
                            <p>{{ result.service }} ({{ result.description }}). Estimasi {{ result.cost[0].etd }} hari
                            </p>
                            <p class="harga-shipping">{{ 'Rp.' + result.cost[0].value.toLocaleString('id-ID', {
                                minimumFractionDigits: 0, maximumFractionDigits: 0
                            }) }}</p>
                        </label>
                    </li>
                </ul>
                <div v-else-if="!loading && !shippingResults">No results found</div>
            </div>

            <div class="grid grid-cols-1 gap-4 justify-between pt-8">
                <div class="md:col-start-1 md:col-end-3 grid md:block">
                    <button @click="goBack"
                        class="px-8 py-3 hover:shadow-xl border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white rounded-md">Kembali</button>
                </div>
                <div class="md:col-end-7 md:col-span-2 grid md:block order-first md:order-1">
                    <button @click="payment" :disabled="!selectedShippingCost || isLoading"
                        class="px-8 py-3 bg-slate-900 text-white rounded-md hover:shadow-xl">
                        <span v-if="isLoading">Processing...</span>
                        <span v-else>Lanjutkan ke Pembayaran</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup> 
import { ref, watch } from 'vue';
import { useForm } from '~/composables/useForm';
import { useCheckout } from '~/composables/useCheckout';
import axios from 'axios';
import { useNuxtApp } from '#app';
const { $swal } = useNuxtApp();
const api_development_url = useRuntimeConfig().public.api_development_url;
const laravel = useRuntimeConfig().public.laravel;

const props = defineProps({
    totalWeight: Number,
    totalCost: Number,
});
const emit = defineEmits(['back-to-formalamat', 'update-shipping-cost']);

const { formData } = useForm();
const selectedCourier = ref(null);
const shippingResults = ref(null);
const loading = ref(false);
const selectedShippingCost = ref(null);
const isLoading = ref(false);

const goBack = () => {
    emit('back-to-formalamat');
};

watch(selectedCourier, (newCourier) => {
    if (newCourier) {
        checkShippingCost();
    }
});

const checkShippingCost = async () => {
    loading.value = true;
    try {
        const datac = {
            origin: 22,
            destination: formData.value.selectedCity.city_id,
            weight: props.totalWeight,
            courier: selectedCourier.value,
        };

        const response = await fetch(`${api_development_url}/fend/cek-ongkir`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datac),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        shippingResults.value = data.sort((a, b) => a.cost[0].value - b.cost[0].value);
    } catch (error) {
        console.error('Error fetching shipping cost:', error);
    } finally {
        loading.value = false;
    }
};

const payment = async () => {
    isLoading.value = true;
    try {
        const { retrieveCheckoutData, clearCheckoutData } = useCheckout();
        const checkoutData = retrieveCheckoutData();
        const clearCheckout = clearCheckoutData();

        if (!checkoutData || !Array.isArray(checkoutData)) {
            console.error('Invalid checkout data');
            return;
        }

        const items = checkoutData.map((item) => ({
            id_produk: item.id_produk,
            nama_produk: item.name,
            jumlah_barang: item.quantity,
            harga_satuan: item.price,
            ukuran: item.size,
        }));

        const selectedShipping = shippingResults.value.find(
            (result) => result.cost[0].value === selectedShippingCost.value
        );

        const shippingDescription = selectedShipping
            ? `${selectedCourier.value} ${selectedShipping.service} (${selectedShipping.description}) : ${selectedShipping.cost[0].etd} Hari`
            : 'No shipping method selected';

        const dataPayment = {
            nama_lengkap: formData.value.name,
            payer_email: formData.value.email,
            nomor_hp: formData.value.no_telp,
            amount: props.totalCost,
            negara: 'ID',
            provinsi: formData.value.selectedCity.province,
            kota: `${formData.value.selectedCity.type} ${formData.value.selectedCity.city_name}`,
            alamat_lengkap: formData.value.address,
            kode_pos: formData.value.postalCode,
            berat: props.totalWeight,
            items,
            nama_pengiriman: shippingDescription,
            harga_pengiriman: selectedShippingCost.value,
        };

        const response = await axios.post(`${laravel}/api/payments`, dataPayment);
        if (response.data.status == true) {
            $swal.fire({
            icon: 'success',
            title: 'Pembayaran Berhasil',
            text: 'Silakan klik untuk melanjutkan ke pembayaran',
            timer: 5000,
            showConfirmButton: true,
            confirmButtonText: 'OK',
            willClose: () => {
                window.location.href = response.data.checkout_link;
                
            },
            clearCheckout
        })
        } else {
            $swal.fire('Gagal', 'Pembayaran gagal diproses', 'error');
        }
    } catch (error) {
        $swal.fire('Gagal', 'Terjadi kesalahan dalam proses pembayaran', 'error');
    } finally {
        isLoading.value = false;
    }
};


const emitShippingCost = (cost) => {
    emit('update-shipping-cost', cost);
};
</script>

<style scoped>
.harga-shipping {
    font-weight: bold;
}
</style>
