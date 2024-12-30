<template>
  <div>
    <div class="announcement-bar bg-slate-900 text-white p-3 relative">
      
        <div :key="currentIndex" class="relative">
          <div class="chevron-left absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer" @click="prevSlide">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>
        <transition name="slide-fade" mode="out-in">
          <p class="inline-block transform text-xs md:text-base ">
            {{ announcements[currentIndex].message }} <b>{{ announcements[currentIndex].discount }}</b>, <a :href="announcements[currentIndex].link" class="underline underline-offset-2">Temukan Disini!</a>
          </p>
        </transition>
          <div class="chevron-right absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer" @click="nextSlide">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      announcements: [
        { message: 'Diskon Akhir Tahun Hingga', discount: '35%', link: '#' },
        { message: 'Penawaran Spesial untuk Anda', discount: '20%', link: '#' },
        { message: 'Promo Terbatas, Segera Dapatkan!', discount: '50%', link: '#' },
      ],
      currentIndex: 0,
      show: true,
    };
  },
  mounted() {
    setInterval(() => {
      this.show = false;
      setTimeout(() => {
        this.nextSlide();
        this.show = true;
      }, 500); // Sesuaikan durasi animasi keluar-masuk di sini
    }, 5000); // Sesuaikan durasi tampilan setiap slide di sini
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.announcements.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.announcements.length) % this.announcements.length;
    },
  },
};
</script>

<style scoped>
.announcement-bar {
  text-align: center;
  font-size: 1rem;
  border: none;
}

.announcement-bar a {
  color: #ffffff;
}

.announcement-bar a:hover {
  text-decoration: underline;
}

/* Animasi transisi */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.5s;
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
}
</style>
