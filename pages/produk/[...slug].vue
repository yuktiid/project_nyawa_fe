<template>
  <div>
    <Product />
  </div>
</template>

<script>
import Product from '~/components/layouts/slug.vue';

export default {
  components: {
    Product,
  }
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s ease-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>