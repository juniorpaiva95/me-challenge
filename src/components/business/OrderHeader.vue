<script setup lang="ts">
import { User, Mail, Phone, Info } from 'lucide-vue-next'
import { Badge } from '@/components/ui'

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
</script>

<template>
  <div class="bg-white rounded-lg shadow-2xs border border-gray-200 p-6">
    <div class="flex flex-col gap-6 md:flex-row">
      <!-- Left Section - Pre-Order Card -->
      <div
        class="bg-blue-600 w-full md:w-[200px] text-white rounded-lg rounded-l-none p-6 text-center flex flex-col items-center justify-center"
      >
        <div class="text-sm font-medium opacity-90 mb-2">Pre-Order</div>
        <div class="text-3xl font-bold mb-2">{{ orderNumber }}</div>
        <div class="text-sm opacity-90">{{ orderReference }}</div>
      </div>

      <!-- Middle Section - Buyer Information -->
      <div class="flex-1">
        <div class="flex flex-col items-center md:items-start">
          <!-- Buyer Details -->
          <div class="mb-6 lg:mb-0">
            <h3 class="text-xl font-semibold text-[#303E49!important] mb-4">
              {{ buyerCompany }}
            </h3>
            <div class="space-y-3">
              <div class="flex items-center text-gray-700">
                <User class="w-4 h-4 mr-3 text-gray-500" />
                <span class="text-sm font-normal">{{ buyerName }}</span>
              </div>
              <div class="flex flex-col md:flex-row justify-start gap-3 md:gap-10">
                <div class="flex items-center text-gray-700">
                  <Mail class="w-4 h-4 mr-3 text-gray-500" />
                  <span class="text-sm font-normal">{{ buyerEmail }}</span>
                </div>
                <div class="flex items-center text-gray-700">
                  <Phone class="w-4 h-4 mr-3 text-gray-500" />
                  <span class="text-sm font-normal">{{ buyerPhone1 }}</span>
                </div>
                <div class="flex items-center text-gray-700">
                  <Phone class="w-4 h-4 mr-3 text-gray-500" />
                  <span class="text-sm font-normal">{{ buyerPhone2 }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Section - Amount, Status and Timestamp -->
      <div class="flex flex-col justify-center items-center">
        <div class="text-2xl font-bold text-gray-800 mb-3">{{ amount }}</div>
        <Badge variant="success" size="md" class="mb-4">
          {{ status }}
        </Badge>
        <div class="text-sm text-gray-500 flex items-center justify-end">
          <span>Created at {{ createdAt }}</span>
          <span class="ml-2 text-gray-400">
            <Info class="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
