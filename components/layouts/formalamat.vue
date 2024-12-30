<template>
  <div class="">
    <div class="space-y-4 p-8  container mx-auto">
      <h1 class="text-2xl font-semibold">Kontak</h1>
      <div class="relative">
        <input v-model="formData.email" type="text" name="email" id="floating_outlined1"
          class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-slate-500 peer"
          placeholder="" />
        <label for="floating_outlined1"
          class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-slate-800  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
      </div>
      <div class="relative">
        <input v-model="formData.no_telp" type="text" name="no_telp" id="floating_outlined2"
          class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-slate-500 peer"
          placeholder="" />
        <label for="floating_outlined2"
          class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-slate-800  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">No.
          Telepon (WhatsApp)</label>
      </div>
      <h1 class="text-xl font-semibold">Alamat Pengiriman</h1>
      <div class="grid md:grid-cols-2 gap-4 md:gap-6">
        <div class="relative">
          <input v-model="formData.name" type="text" name="name" id="floating_outlined3"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-slate-500 peer"
            placeholder="" />
          <label for="floating_outlined3"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-slate-800  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nama
            Lengkap</label>
        </div>
        <div class="relative">
          <select v-model="selectedProvince" @change="getCities" id="floating_outlined4"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-slate-500 peer">
            <option disabled selected>Pilih Provinsi</option>
            <option v-for="province in provinces" :key="province.province_id" :value="province.province_id">
              {{ province.province }}
            </option>
          </select>
          <label for="floating_outlined4"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-slate-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">Provinsi</label>
        </div>
        <!-- {{ city.type+ ' ' + city.city_name }} -->
        <div class="relative">
          <select v-model="formData.selectedCity" @change="updatePostalCode" id="floating_outlined5"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-slate-500 peer">
            <option value="" disabled selected>Pilih Kabupaten/Kota</option>
            <option v-for="city in cities" :key="city.city_id" :value="city">
              {{ city.type + ' ' + city.city_name }}
            </option>
          </select>
          <label for="floating_outlined5"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-slate-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">Kabupaten
            / Kota</label>
        </div>
        <div class="relative">
          <input type="text" name="postal_code" v-model="formData.postalCode" id="floating_outlined6"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-slate-500 peer"
            placeholder="" />
          <label for="floating_outlined6"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-slate-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">Kode
            Pos</label>
        </div>
      </div>
      <div class="relative">
        <textarea v-model="formData.address" id="message" rows="2"
          class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-slate-500 peer"
          placeholder=""></textarea>
        <label for="message"
          class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-2 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-slate-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">Alamat
          Lengkap</label>
      </div>

      <div class="grid grid-cols-1 gap-4 justify-between pt-8">
        <div class="md:col-start-1 md:col-end-3 grid md:block">
          <button @click="handleBack"
            class="px-8 py-3 hover:shadow-xl border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white rounded-md">Kembali</button>
        </div>
        <div class="md:col-end-7 md:col-span-2 grid md:block order-first md:order-1">
          <button @click="handleNext" class="px-8 py-3 bg-slate-900 text-white rounded-md hover:shadow-xl">Lanjut ke
            Pengiriman</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, watch, onMounted } from 'vue';
import { useForm } from '~/composables/useForm';

export default defineComponent({
  emits: ['show-shipping'],
  setup(props, { emit }) {
    const { api_development_url, Api_key } = useRuntimeConfig().public;
    const { formData } = useForm();
    const provinces = ref([]);
    const cities = ref([]);
    const selectedProvince = ref('');
    const selectedCity = ref('');

    const handleNext = () => {
      emit('show-shipping');
    };

    const handleBack = () => {
      localStorage.removeItem('checkoutOrder');
      window.history.back();
    };

    const getProvinces = async () => {
      try {
        const response = await fetch(`${api_development_url}/fend/api/province`, {
          headers: {
            'Authorization': Api_key,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        provinces.value = data;
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    const getCities = async () => {
      formData.value.selectedCity = ''; // Reset selectedCity
      try {
        const response = await fetch(`${api_development_url}/fend/api/city/${selectedProvince.value}`, {
          headers: {
            'Authorization': Api_key,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        cities.value = data;
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    // Trigger to fetch provinces when the component is mounted
    onMounted(async () => {
      try {
        await getProvinces();
      } catch (error) {
        console.error('Error loading provinces:', error);
      }
    });

    return {
      formData,
      provinces,
      cities,
      selectedProvince,
      selectedCity,
      handleNext,
      handleBack,
      getProvinces,
      getCities
    };
  }
});
</script>

