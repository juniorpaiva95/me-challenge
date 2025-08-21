<script setup lang="ts">
import { computed } from 'vue'

interface BadgeProps {
  variant?: 'success' | 'error' | 'warning' | 'info'
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'info',
  size: 'md',
  text: '',
})

// Classes dinâmicas baseadas nas props
const badgeClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full'

  // Classes de tamanho
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  }

  // Classes de variante
  const variantClasses = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  }

  return [baseClasses, sizeClasses[props.size], variantClasses[props.variant]].join(' ')
})
</script>

<template>
  <span :class="badgeClasses">
    <slot>{{ text }}</slot>
  </span>
</template>
