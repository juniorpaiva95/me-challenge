<script setup lang="ts">
import { OrderHeader, OrderDetails } from '@/components/business'
import { useOrder } from '@/composables/useOrder'
import { onMounted } from 'vue'

const { fetchOrderById } = useOrder()

onMounted(async () => {
  await fetchOrderById('1')
})
</script>

<template>
  <div class="min-h-screen p-6">
    <!-- Order Header Component -->
    <OrderHeader />

    <!-- Main Content -->
    <main class="section py-10">
      <OrderDetails />
    </main>
  </div>
</template>

<style scoped></style>
