<template>
  <div>
    <!-- Section untuk Sign In -->
    <section v-if="!isCodeSent" class="bg-gray-50">
      <div class="flex flex-col items-center justify-center px-6 py-16 mx-auto">
        <div class="w-full bg-white rounded-lg shadow-xl border md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <p>Enter your email and we'll send you a login code</p>
            <form @submit.prevent="sendVerificationEmail" class="space-y-4 md:space-y-6">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input type="email" v-model="email" id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com" required />
              </div>
              <button type="submit"
                class="w-full text-white bg-slate-900 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Section untuk memasukkan Kode Verifikasi -->
    <section v-if="isCodeSent" class="bg-gray-50">
      <div class="flex flex-col items-center justify-center px-6 py-16 mx-auto">
        <div class="w-full bg-white rounded-lg shadow-xl border md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Enter Code
            </h1>
            <p>Sent to {{ email }}</p>
            <form @submit.prevent="verifyCode" class="space-y-4 md:space-y-6">
              <div>
                <label for="code" class="block mb-2 text-sm font-medium text-gray-900">Your code</label>
                <input type="text" v-model="code" id="code"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter verification code" required />
              </div>
              <p v-if="countdown > 0">You can resend the code in {{ countdown }} seconds</p>
              <button type="submit"
                class="w-full text-white bg-slate-900 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Sign in
              </button>
              <button @click="resetEmail"
                class="w-full text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Log in with a different email
              </button>
              <button v-if="countdown === 0" @click="resendVerificationCode"
                class="w-full text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Resend Code
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useTokens } from '~/composables/useToken2';
const email = ref('');
const code = ref('');
const isCodeSent = ref(false);
const countdown = ref(60);
let countdownTimer;
const { public: { api_development_url } } = useRuntimeConfig(); // Pindahkan ke dalam setup()

// Fungsi untuk mengirim email verifikasi
const sendVerificationEmail = async () => {
  isCodeSent.value = true;
  try {
    await axios.post(`${api_development_url}/login-fe/send`, { email: email.value },{
      headers: {
        'Authorization': useRuntimeConfig().public.Api_key,
        'Content-Type': 'application/json',
      },
    });
    startCountdown();
  } catch (error) {
    console.error('Gagal mengirim email verifikasi:', error);
  }
};

// Fungsi untuk memverifikasi kode
const verifyCode = async () => {
  try {
    const response = await axios.post(`${api_development_url}/login-fe/verify`, { email: email.value, code: code.value },{
      headers: {
        'Authorization': useRuntimeConfig().public.Api_key,
        'Content-Type': 'application/json',
      },
    });
    if (response.data.status == true) {
      const token = response.data.token;
      const userEmail = response.data.email;
      const { saveToken } = useTokens();
      saveToken(token, userEmail);
      email.value = '';
      code.value = '';
      isCodeSent.value = false;
      clearInterval(countdownTimer);
      countdown.value = 60;
      return navigateTo('/users');
    } else {
      console.log(response);
    }
  } catch (error) {
    console.error('Gagal memverifikasi kode:', error);
  }
};

// Fungsi untuk reset email
const resetEmail = () => {
  email.value = '';
  isCodeSent.value = false;
};

// Fungsi untuk mengirim ulang kode verifikasi
const resendVerificationCode = async () => {
  try {
    await axios.post(`${api_development_url}/login-fe/send`, { email: email.value });
    countdown.value = 60;
    startCountdown();
  } catch (error) {
    console.error('Gagal mengirim ulang kode verifikasi:', error);
  }
};

// Fungsi untuk memulai hitungan mundur
const startCountdown = () => {
  if (countdownTimer) clearInterval(countdownTimer);
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1;
    } else {
      clearInterval(countdownTimer);
    }
  }, 1000);
};

onMounted(() => {
  if (typeof window !== "undefined") {
    // return navigateTo('/users')
  }
});

useHead({
  title: 'Log in',
});
</script>

