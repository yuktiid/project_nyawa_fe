<template>
  <div>
    <ProductList />
  </div>
</template>

<script>
import ProductList from '~/components/layouts/produk.vue';

export default {
  components: {
    ProductList,
  },
  methods: {
  selectProduct(product) {
    this.selectedProduct = product;
    this.isPopupVisible = true;
    }, 
  },
};
</script>

