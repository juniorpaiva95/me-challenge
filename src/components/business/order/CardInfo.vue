<script setup lang="ts">
import { computed } from 'vue'
import Badge from '../../ui/Badge.vue'

interface CardInfoProps {
  title: string
  entity: string
  badge?: {
    text: string
    variant?: 'success' | 'error' | 'warning' | 'info'
    size?: 'sm' | 'md' | 'lg'
  }
  headerClass?: string
  bodyClass?: string
  titleClass?: string
  entityClass?: string
  badgeClass?: string
}

const props = withDefaults(defineProps<CardInfoProps>(), {
  badge: undefined,
  headerClass: '',
  bodyClass: '',
  titleClass: '',
  entityClass: '',
  badgeClass: '',
})

const headerClasses = computed(() => {
  const baseClasses = 'flex items-start justify-between mb-4'
  const customClasses = props.headerClass

  return `${baseClasses} ${customClasses}`.trim()
})

const titleClasses = computed(() => {
  const baseClasses = 'text-sm text-gray-500 font-medium'
  const customClasses = props.titleClass

  return `${baseClasses} ${customClasses}`.trim()
})

const entityClasses = computed(() => {
  const baseClasses = 'text-base font-semibold text-gray-900'
  const customClasses = props.entityClass

  return `${baseClasses} ${customClasses}`.trim()
})

const badgeClasses = computed(() => {
  const baseClasses = 'ml-2'
  const customClasses = props.badgeClass

  return `${baseClasses} ${customClasses}`.trim()
})

const bodyClasses = computed(() => {
  const baseClasses = ''
  const customClasses = props.bodyClass

  return `${baseClasses} ${customClasses}`.trim()
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div :class="headerClasses">
      <div class="flex-1">
        <div :class="titleClasses">
          {{ title }}
        </div>

        <div class="flex items-center">
          <span :class="entityClasses">
            {{ entity }}
          </span>

          <Badge
            v-if="badge"
            :variant="badge.variant || 'info'"
            :size="badge.size || 'sm'"
            :class="badgeClasses"
          >
            {{ badge.text }}
          </Badge>
        </div>
      </div>
    </div>

    <div :class="bodyClasses">
      <!-- Slot para Conteúdo Customizado -->
      <slot />
    </div>
  </div>
</template>
