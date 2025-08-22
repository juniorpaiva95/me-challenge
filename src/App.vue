<script setup lang="ts">
import { useOrder } from '@/composables/useOrder'
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

const { fetchOrderById } = useOrder()

onMounted(async () => {
  await fetchOrderById('1')
})
</script>

<template>
  <div class="min-h-screen p-6">
    <main class="section">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
