<script setup lang="ts">
import { useRoute } from 'vue-router'
import { OrderHeader, OrderDetails } from '@/components/business'
import { useOrder } from '@/composables/useOrder'
import { onMounted } from 'vue'

const route = useRoute()

const orderId = route.params.id
const { fetchOrderById } = useOrder()

onMounted(async () => {
  await fetchOrderById(orderId as string)
})
</script>
<template>
  <div>
    <OrderHeader />
    <br />
    <OrderDetails />
  </div>
</template>
