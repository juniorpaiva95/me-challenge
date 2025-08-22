<script setup lang="ts">
import { User, Mail, Phone, Info } from 'lucide-vue-next'
import { Badge } from '@/components/ui'
import { useOrder } from '@/composables/useOrder'
import { formatCurrency } from '@/utils/utils'
import Skeleton from '../../ui/Skeleton.vue'

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

defineProps<OrderHeaderProps>()

// Agora o composable é singleton, então todos os componentes compartilham o mesmo estado
const { loading, order } = useOrder()
</script>

<template>
  <div class="bg-white rounded-lg shadow-2xs border border-gray-200 p-6">
    <!-- Loading state -->
    <div
      v-if="loading"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <!-- Content -->
    <div class="flex flex-col gap-6 md:flex-row">
      <template v-if="loading">
        <div
          class="bg-blue-600 w-full md:w-[200px] text-white rounded-lg rounded-l-none p-6 text-center flex flex-col items-center justify-center"
        >
          <div class="text-sm font-medium opacity-90 mb-2">Pre-Order</div>
          <div class="text-3xl font-bold mb-2">
            <Skeleton shape="line" width="100px" height="16px" theme="dark" />
          </div>
          <div class="text-sm opacity-90">
            <Skeleton shape="line" width="100px" height="16px" theme="dark" />
          </div>
        </div>

        <div class="flex flex-col items-center md:items-start w-full">
          <!-- Buyer Details -->
          <div class="mb-6 lg:mb-0 w-full">
            <h3 class="text-xl font-semibold text-[#303E49!important] mb-4">
              <Skeleton shape="line" width="100%" height="16px" />
            </h3>
            <div class="space-y-3">
              <div class="flex items-center text-gray-700">
                <Skeleton shape="circle" width="16px" height="16px" class="mr-3" />
                <Skeleton shape="line" width="100%" height="16px" />
              </div>
              <div class="flex flex-col xl:flex-row justify-start gap-3 xl:gap-10">
                <div class="flex items-center text-gray-700 w-full">
                  <Skeleton shape="circle" width="16px" height="16px" class="mr-3" />
                  <Skeleton shape="line" width="100%" height="16px" />
                </div>
                <div class="flex items-center text-gray-700 w-full">
                  <Skeleton shape="circle" width="16px" height="16px" class="mr-3" />
                  <Skeleton shape="line" width="100%" height="16px" />
                </div>
                <div class="flex items-center text-gray-700 w-full">
                  <Skeleton shape="circle" width="16px" height="16px" class="mr-3" />
                  <Skeleton shape="line" width="100%" height="16px" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-center items-center gap-3 xl:gap-3 w-full">
          <div class="text-2xl font-bold text-gray-800 mb-3 w-full">
            <Skeleton shape="line" width="100%" height="16px" />
          </div>

          <Skeleton shape="line" width="100%" height="16px" />

          <div class="text-sm text-gray-500 flex flex-row justify-center items-center w-full">
            <Skeleton shape="line" width="100%" height="16px" />
            <span class="ml-2 text-gray-400">
              <Skeleton shape="circle" width="16px" height="16px" class="mr-3" />
            </span>
          </div>
        </div>
      </template>
      <!-- Left Section - Pre-Order Card -->
      <template v-else>
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
                <div class="flex flex-col xl:flex-row justify-start gap-3 xl:gap-10">
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
        <div class="flex flex-col justify-center items-center gap-3 xl:gap-0">
          <div class="text-2xl font-bold text-gray-800 mb-3">
            {{ formatCurrency(order?.header.currency, order?.header.price ?? 0) }}
          </div>
          <Badge variant="success" size="md" class="mb-4">
            {{ order?.header.status }}
          </Badge>

          <div class="text-sm text-gray-500 flex flex-row justify-center items-center">
            <span>Created at {{ order?.header.createdAt }}</span>
            <span class="ml-2 text-gray-400">
              <Info class="w-4 h-4" />
            </span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
