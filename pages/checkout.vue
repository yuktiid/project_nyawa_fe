<template>
    <LayoutsInfopay />
</template>
  
<script setup>
useHead({
  title: 'Checkout',
});
definePageMeta({
  middleware: 'check-checkout-order', // Use kebab-case name
});
</script>  