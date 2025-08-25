<script setup lang="ts">
import { computed } from 'vue'
import type { Component, VNode } from 'vue'
import Badge from '../../ui/Badge.vue'
import Skeleton from '../../ui/Skeleton.vue'

interface CardInfoProps {
  title: string | Component | VNode
  entity: string | Component | VNode
  skeleton?: Component | VNode
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
  loading?: boolean
}

const props = withDefaults(defineProps<CardInfoProps>(), {
  badge: undefined,
  headerClass: '',
  bodyClass: '',
  titleClass: '',
  entityClass: '',
  badgeClass: '',
  loading: false,
})

const headerClasses = computed(() => {
  const baseClasses = 'flex items-start justify-between mb-4'
  const customClasses = props.headerClass

  return `${baseClasses} ${customClasses}`.trim()
})

const titleClasses = computed(() => {
  const baseClasses = 'text-sm text-gray-500 font-medium mb-2'
  const customClasses = props.titleClass

  return `${baseClasses} ${customClasses}`.trim()
})

const entityClasses = computed(() => {
  const baseClasses = 'text-base font-semibold text-gray-900 mb-2'
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
  <div
    class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:scale-[1.01] transition-all duration-300"
  >
    <div :class="headerClasses">
      <div class="flex-1">
        <div :class="titleClasses">
          <Skeleton shape="line" :width="100" v-if="loading" />
          <component v-else-if="typeof title !== 'string'" :is="title" />
          <span v-else>{{ title }}</span>
        </div>

        <div class="flex items-center">
          <Skeleton shape="line" :width="200" v-if="loading" />
          <component v-else-if="typeof entity !== 'string'" :is="entity" />
          <span v-else :class="entityClasses">{{ entity }}</span>

          <div class="ml-2">
            <Skeleton shape="line" :width="100" v-if="loading" />
            <Badge
              v-if="badge && !loading"
              :variant="badge.variant || 'info'"
              :size="badge.size || 'sm'"
              :class="badgeClasses"
            >
              {{ badge.text }}
            </Badge>
          </div>
        </div>
      </div>
    </div>

    <div :class="bodyClasses">
      <!-- Slot para Conteúdo Customizado -->
      <slot />
    </div>
  </div>
</template>
