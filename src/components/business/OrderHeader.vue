<script setup lang="ts">
import { User, Mail, Phone, Info } from 'lucide-vue-next'
import { Badge } from '@/components/ui'
import { useOrder } from '@/composables/useOrder'
import { onMounted } from 'vue'
import { formatCurrency } from '@/utils/utils'

interface OrderHeaderProps {
  orderNumber?: string
  orderReference?: string
  buyerName?: string
  buyerCompany?: string
  buyerEmail?: string
  buyerPhone1?: string
  buyerPhone2?: string
  amount?: string
  status?: string
  createdAt?: string
}

withDefaults(defineProps<OrderHeaderProps>(), {
  orderNumber: '4510001114',
  orderReference: '#ME11223344',
  buyerName: 'Jacksonville Group (Jason Burn)',
  buyerCompany: 'MTP West Buyer',
  buyerEmail: 'jacksonvillegroup@me.com',
  buyerPhone1: '903-575-3050',
  buyerPhone2: '999-575-3050',
  amount: 'USD 20000',
  status: 'Need to confirm',
  createdAt: '2020-04-16 at 15:32:55',
})

const { loading, error, clearError, fetchOrderById, order } = useOrder()

const handleErrorClear = () => {
  clearError()
}

onMounted(async () => {
  // @TODO: Simular rota com parametros, recuperar pelo roteamento
  await fetchOrderById('1')
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-2xs border border-gray-200 p-6">
    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div class="flex items-center">
        <span class="text-red-600 mr-2">⚠️</span>
        <span class="text-red-800">{{ error }}</span>
        <button
          @click="handleErrorClear"
          class="ml-auto text-red-600 hover:text-red-800 text-sm underline"
        >
          Dismiss
        </button>
      </div>
    </div>

    <!-- Content -->
    <div v-else class="flex flex-col gap-6 md:flex-row">
      <!-- Left Section - Pre-Order Card -->
      <div
        class="bg-blue-600 w-full md:w-[200px] text-white rounded-lg rounded-l-none p-6 text-center flex flex-col items-center justify-center"
      >
        <div class="text-sm font-medium opacity-90 mb-2">Pre-Order</div>
        <div class="text-3xl font-bold mb-2">{{ order?.header.number }}</div>
        <div class="text-sm opacity-90">{{ order?.header.serial }}</div>
      </div>

      <!-- Middle Section - Buyer Information -->
      <div class="flex-1">
        <div class="flex flex-col items-center md:items-start">
          <!-- Buyer Details -->
          <div class="mb-6 lg:mb-0">
            <h3 class="text-xl font-semibold text-[#303E49!important] mb-4">
              {{ order?.header.buyer }}
            </h3>
            <div class="space-y-3">
              <div class="flex items-center text-gray-700">
                <User class="w-4 h-4 mr-3 text-gray-500" />
                <span class="text-sm font-normal">{{ order?.header.contact.name }}</span>
              </div>
              <div class="flex flex-col md:flex-row justify-start gap-3 md:gap-10">
                <div class="flex items-center text-gray-700">
                  <Mail class="w-4 h-4 mr-3 text-gray-500" />
                  <span class="text-sm font-normal">{{ order?.header.contact.email }}</span>
                </div>
                <div class="flex items-center text-gray-700">
                  <Phone class="w-4 h-4 mr-3 text-gray-500" />
                  <span class="text-sm font-normal">{{ order?.header.contact.phone }}</span>
                </div>
                <div class="flex items-center text-gray-700">
                  <Phone class="w-4 h-4 mr-3 text-gray-500" />
                  <span class="text-sm font-normal">{{ order?.header.contact.fax }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Section - Amount, Status and Timestamp -->
      <div class="flex flex-col justify-center items-center">
        <div class="text-2xl font-bold text-gray-800 mb-3">
          {{ formatCurrency(order?.header.currency, order?.header.price ?? 0) }}
        </div>
        <Badge variant="success" size="md" class="mb-4">
          {{ order?.header.status }}
        </Badge>
        <div class="text-sm text-gray-500 flex items-center justify-end">
          <span>Created at {{ order?.header.createdAt }}</span>
          <span class="ml-2 text-gray-400">
            <Info class="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
