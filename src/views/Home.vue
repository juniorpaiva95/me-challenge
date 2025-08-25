<script setup lang="ts">
import { useRouter } from 'vue-router'
import CallToAction from '../components/ui/CallToAction.vue'

const router = useRouter()

const viewOrder = (id: string) => router.push({ name: 'order-view', params: { id: id } })
</script>
<template>
  <div class="flex justify-center items-center h-svh gap-4">
    <CallToAction title="View Order" data-testid="view-order-1">
      <template #description>
        <p>View <span class="font-bold text-green-500">order</span> with your order id (1)</p>
      </template>
      <template #actions>
        <button
          class="px-4 py-2 bg-blue-700 text-gray-100 rounded-md cursor-pointer"
          @click="viewOrder('1')"
        >
          View Order
        </button>
      </template>
    </CallToAction>

    <CallToAction title="View Order" data-testid="view-order-2">
      <template #description>
        <p>
          View <span class="font-bold text-red-500">inexistent order</span> with your order id (2)
        </p>
      </template>
      <template #actions>
        <button
          class="px-4 py-2 bg-blue-700 text-gray-100 rounded-md cursor-pointer"
          @click="viewOrder('2')"
        >
          View Order
        </button>
      </template>
    </CallToAction>
  </div>
</template>
