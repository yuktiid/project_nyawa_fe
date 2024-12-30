<template>
    <div>
        <Users />
    </div>
</template>

<script>
import Users from '~/components/layouts/users.vue';
definePageMeta({
  middleware: 'check-users', // Use kebab-case name
});

export default {
    components: {
        Users,
    }
}; 
</script>

<script setup>
useHead({
  title: 'Users',
});</script>