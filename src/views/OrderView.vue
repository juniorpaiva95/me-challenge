<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { OrderHeader, OrderDetails } from '@/components/business'
import { useOrder } from '@/composables/useOrder'
import { onMounted } from 'vue'
import { MoveLeft, Printer } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const orderId = route.params.id
const { fetchOrderById } = useOrder()

onMounted(async () => {
  await fetchOrderById(orderId as string)
})

const printOrder = () => {
  window.print()
}
</script>
<template>
  <div
    class="flex items-center justify-between gap-2 bg-white p-4 rounded-md mb-4 cursor-pointer border border-gray-200"
  >
    <div
      class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2"
      @click="router.push({ name: 'home' })"
    >
      <MoveLeft class="w-6 h-6" />
      <span class="text-sm font-medium">Back to Home</span>
    </div>
    <div class="flex items-center gap-2">
      <button
        class="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-gray-100 rounded-md cursor-pointer flex items-center gap-2"
        @click="printOrder"
      >
        Print Order <Printer class="w-4 h-4" />
      </button>
    </div>
  </div>
  <OrderHeader />
  <br />
  <OrderDetails />
</template>
