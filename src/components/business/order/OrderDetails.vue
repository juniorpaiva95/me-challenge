<script setup lang="ts">
import { useOrder } from '@/composables/useOrder'
import Skeleton from '../../ui/Skeleton.vue'
import { BookOpenCheck, Building2, Mail, MapPin, Phone, Printer, User } from 'lucide-vue-next'
import CardInfo from './CardInfo.vue'
import Collapse from '../../ui/Collapse.vue'
import Badge from '../../ui/Badge.vue'

const { loading, order, error } = useOrder()
</script>

<template>
  <div class="w-full mb-6" v-if="!error">
    <CardInfo
      :loading="loading"
      title="Supplier"
      entity="Motion Industries INC"
      :badge="{
        text: `#${order?.supplier?.code?.toString() ?? ''}`,
        variant: 'info',
        size: 'sm',
      }"
    >
      <!-- Layout em 2 colunas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Coluna 1 -->
        <div class="space-y-3">
          <div class="flex items-center text-gray-700">
            <template v-if="loading">
              <Skeleton shape="circle" width="16px" height="16px" class="mr-3" />
              <Skeleton shape="line" width="100%" height="16px" />
            </template>

            <template v-else>
              <Building2
                v-if="order?.supplier?.document.type === 'CNPJ'"
                class="w-4 h-4 mr-3 text-gray-500 flex-shrink-0"
              />
              <User v-else class="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />

              <span class="text-sm">{{ order?.supplier?.document?.value }}</span>
            </template>
          </div>
          <div class="flex items-center text-gray-700">
            <template v-if="loading">
              <Skeleton shape="circle" width="16px" height="16px" class="mr-3" />
              <Skeleton shape="line" width="100%" height="16px" />
            </template>

            <template v-else>
              <MapPin class="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
              <span class="text-sm">{{ order?.supplier?.address }}</span>
            </template>
          </div>
          <div class="flex items-center text-gray-700">
            <template v-if="loading">
              <Skeleton shape="circle" width="16px" height="16px" class="mr-3" />
              <Skeleton shape="line" width="100%" height="16px" />
            </template>

            <template v-else>
              <User class="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
              <span class="text-sm">{{ order?.supplier?.contact?.name }}</span>
            </template>
          </div>
        </div>

        <!-- Coluna 2 -->
        <div class="space-y-3">
          <div class="flex items-center text-gray-700">
            <template v-if="loading">
              <Skeleton shape="circle" width="16px" height="16px" class="mr-3" />
              <Skeleton shape="line" width="100%" height="16px" />
            </template>

            <template v-else>
              <Mail class="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
              <span class="text-sm">{{ order?.supplier?.contact?.email }}</span>
            </template>
          </div>
          <div class="flex items-center text-gray-700">
            <template v-if="loading">
              <Skeleton shape="circle" width="16px" height="16px" class="mr-3" />
              <Skeleton shape="line" width="100%" height="16px" />
            </template>

            <template v-else>
              <Phone class="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
              <span class="text-sm">{{ order?.supplier?.contact?.phone }}</span>
            </template>
          </div>
          <div class="flex items-center text-gray-700">
            <template v-if="loading">
              <Skeleton shape="circle" width="16px" height="16px" class="mr-3" />
              <Skeleton shape="line" width="100%" height="16px" />
            </template>

            <template v-else>
              <Printer class="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
              <span class="text-sm">{{ order?.supplier?.contact?.fax }}</span>
            </template>
          </div>
          <div class="flex items-center text-gray-700">
            <template v-if="loading">
              <Skeleton shape="circle" width="16px" height="16px" class="mr-3" />
              <Skeleton shape="line" width="100%" height="16px" />
            </template>

            <template v-else>
              <BookOpenCheck class="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
              <span class="text-sm">{{ order?.supplier?.readAt }}</span>
            </template>
          </div>
        </div>
      </div>
    </CardInfo>
  </div>

  <Collapse :defaultOpen="true" v-if="!error">
    <template #header>
      <div class="flex items-center">
        <span class="font-semibold !text-[#303E49] mr-2"
          >Address{{ order?.addresses?.length ? 'es' : '' }}
          <Badge :text="order?.addresses?.length?.toString() ?? '0'" variant="info" size="sm"
        /></span>
      </div>
    </template>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <template v-if="loading">
        <CardInfo v-for="i in 3" :key="i" :loading="loading" :title="''" :entity="''">
          <!-- Layout em 2 colunas -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Coluna 1 -->
            <div class="space-y-3">
              <div class="flex items-center text-gray-700">
                <Skeleton shape="circle" width="16px" height="16px" class="mr-3" />
                <Skeleton shape="line" width="100%" height="16px" />
              </div>
              <div class="flex items-center text-gray-700">
                <Skeleton shape="circle" width="16px" height="16px" class="mr-3" />
                <Skeleton shape="line" width="100%" height="16px" />
              </div>
            </div>

            <!-- Coluna 2 -->
            <div class="space-y-3">
              <div class="flex items-center text-gray-700">
                <Skeleton shape="circle" width="16px" height="16px" class="mr-3" />
                <Skeleton shape="line" width="100%" height="16px" />
              </div>
              <div class="flex items-center text-gray-700">
                <Skeleton shape="circle" width="16px" height="16px" class="mr-3" />
                <Skeleton shape="line" width="100%" height="16px" />
              </div>
              <div class="flex items-center text-gray-500">
                <Skeleton shape="circle" width="16px" height="16px" class="mr-3" />
                <Skeleton shape="line" width="100%" height="16px" />
              </div>
            </div>
          </div>
        </CardInfo>
      </template>
      <template v-else>
        <CardInfo
          v-for="value in order?.addresses"
          :key="value.code ?? Date.now()"
          :title="value.label"
          :entity="value.name"
          :badge="value.code ? { text: `#${value.code}`, variant: 'info', size: 'sm' } : undefined"
        >
          <!-- Layout em 2 colunas -->
          <div class="grid grid-cols-1 2xl:grid-cols-2 gap-4">
            <!-- Coluna 1 -->
            <div class="space-y-3">
              <div class="flex items-center text-gray-700">
                <MapPin class="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
                <span class="text-sm">{{ value.address }}</span>
              </div>
              <div class="flex items-center text-gray-700">
                <User class="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
                <span class="text-sm">{{ value.contact?.name }}</span>
              </div>
            </div>

            <!-- Coluna 2 -->
            <div class="space-y-3">
              <div class="flex items-center text-gray-700">
                <Mail class="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
                <span class="text-sm">{{ value.contact?.email }}</span>
              </div>
              <div class="flex items-center text-gray-700">
                <Phone class="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
                <span class="text-sm">{{ value.contact?.phone }}</span>
              </div>
              <div class="flex items-center text-gray-500">
                <Phone class="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                <span class="text-sm">{{ value.contact?.fax }}</span>
              </div>
            </div>
          </div>
        </CardInfo>
      </template>
    </div>
  </Collapse>
</template>
