<template>
    <div>
      <div class="announcement-bar">
        <div class="my-5">
          <div :key="currentIndex" class="">
            <transition name="slide-fade" mode="out-in">
              <img
                :src="announcements[currentIndex].image"
                alt="Image"
                class="w-[100%] h-[200px] object-cover"
              />
            </transition>
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
          { image: '/lilin2.jpg' },
          { image: '/lilin3.jpg' },
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
  
  /* Animasi transisi */
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: opacity 0.5s;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    opacity: 0;
  }
  </style>
  